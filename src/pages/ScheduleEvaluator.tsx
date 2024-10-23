// ScheduleEvaluator.tsx
import React, { useState, useEffect } from 'react';
import './ScheduleEvaluator.css';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

// Set the root element for accessibility purposes
Modal.setAppElement('#root');

// Define the structure of a Class
interface ClassSchedule {
  id: string;
  title: string;
  day: string; // e.g., 'Monday'
  hour: number; // 0-23 representing the hour of the day
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

const ScheduleEvaluator: React.FC = () => {
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newClassTitle, setNewClassTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; hour: number } | null>(null);
  
  // States for Import Feature
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  // Load classes from localStorage on component mount
  useEffect(() => {
    const savedClasses = localStorage.getItem('scheduleClasses');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    }
  }, []);

  // Save classes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('scheduleClasses', JSON.stringify(classes));
  }, [classes]);

  // Handle clicking on a time slot to add a class
  const handleSlotClick = (day: string, hour: number) => {
    setSelectedSlot({ day, hour });
    setNewClassTitle('');
    setModalIsOpen(true);
  };

  // Handle clicking on an existing class to delete it
  const handleClassClick = (classId: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== classId));
    }
  };

  // Handle modal submission to add a new class
  const handleModalSubmit = () => {
    if (selectedSlot && newClassTitle.trim() !== '') {
      const newClass: ClassSchedule = {
        id: uuidv4(),
        title: newClassTitle.trim(),
        day: selectedSlot.day,
        hour: selectedSlot.hour,
      };
      setClasses([...classes, newClass]);
    }
    setModalIsOpen(false);
    setSelectedSlot(null);
  };

  // Handle modal closure without adding a class
  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedSlot(null);
  };

  // Handle changes in the import textarea
  const handleImportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportText(e.target.value);
  };

  // Handle import submission
  const handleImportSubmit = () => {
    if (!importText.trim()) {
      setImportStatus('error');
      setImportMessage('Please paste your schedule text before importing.');
      return;
    }

    try {
      const parsedClasses = parseScheduleText(importText);
      if (parsedClasses.length === 0) {
        throw new Error('No valid classes found.');
      }
      setClasses([...classes, ...parsedClasses]);
      setImportStatus('success');
      setImportMessage(`${parsedClasses.length} classes imported successfully.`);
      setImportText('');
    } catch (error) {
      console.error(error);
      setImportStatus('error');
      setImportMessage('Failed to parse the schedule. Please check the format and try again.');
    }
  };

  // Function to parse the pasted schedule text
  const parseScheduleText = (text: string): ClassSchedule[] => {
    // Split the text by 'CRN:' followed by numbers to separate class entries
    const classEntries = text.split(/CRN:\s*\d+/).filter(entry => entry.trim() !== '');
    const parsedClasses: ClassSchedule[] = [];

    classEntries.forEach((entry, index) => {
      // Split entry into lines and remove lines with only single letters (e.g., 'M', 'T')
      const lines = entry
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 1); // Remove lines with single characters

      // Rejoin lines to make it easier for regex
      const cleanEntry = lines.join(' ');

      // Debugging: Log the clean entry
      console.log(`Processing Entry ${index + 1}:`, cleanEntry);

      // Extract title from the first part before the first '|'
      const titleMatch = cleanEntry.match(/^(.+?)\s*\|/);
      const title = titleMatch ? titleMatch[1].trim() : 'Untitled Class';

      // Extract days from the line containing the date range and days
      const daysMatch = cleanEntry.match(/(?:\d{2}\/\d{2}\/\d{4}\s*--\s*\d{2}\/\d{2}\/\d{4})\s*([A-Za-z,]+)/);
      const days = daysMatch ? daysMatch[1].split(',').map(day => day.trim()) : [];

      // Extract start time from the line containing time
      const timeMatch = cleanEntry.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/);
      const startTime = timeMatch ? timeMatch[1] : null;

      // Debugging: Log extracted details
      console.log(`Title: ${title}`);
      console.log(`Days: ${days}`);
      console.log(`Start Time: ${startTime}`);

      if (days.length > 0 && startTime) {
        // Convert startTime to 24-hour format to get the hour
        const hour = convertTo24Hour(startTime);
        days.forEach(day => {
          if (daysOfWeek.includes(day)) {
            parsedClasses.push({
              id: uuidv4(),
              title,
              day,
              hour,
            });
          } else {
            console.warn(`Unrecognized day: ${day}`);
          }
        });
      } else {
        console.warn(`Incomplete information for entry ${index + 1}. Skipping.`);
      }
    });

    // Debugging: Log all parsed classes
    console.log('Parsed Classes:', parsedClasses);

    return parsedClasses;
  };

  // Helper function to convert 12-hour time to 24-hour and extract the hour
  const convertTo24Hour = (time: string): number => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours;
  };

  return (
    <div className="schedule-evaluator">
      <h2>Weekly Schedule Evaluator</h2>

      {/* Import Section */}
      <div className="import-section">
        <h3>Import Schedule</h3>
        <textarea
          value={importText}
          onChange={handleImportChange}
          placeholder="Paste your schedule here..."
          rows={15}
        />
        <button onClick={handleImportSubmit}>Import Schedule</button>
        {importStatus === 'success' && <p className="import-success">{importMessage}</p>}
        {importStatus === 'error' && <p className="import-error">{importMessage}</p>}
      </div>

      {/* Schedule Grid */}
      <div className="schedule-grid">
        {/* Render the header with days of the week */}
        <div className="header-cell time-cell">Time</div>
        {daysOfWeek.map(day => (
          <div key={day} className="header-cell day-cell">
            {day}
          </div>
        ))}

        {/* Render the grid for each hour and day */}
        {hoursOfDay.map(hour => (
          <React.Fragment key={hour}>
            {/* Time label */}
            <div className="time-cell">
              {hour < 10 ? `0${hour}:00` : `${hour}:00`}
            </div>
            {/* Time slots for each day */}
            {daysOfWeek.map(day => {
              // Check if there's a class for this day and hour
              const cls = classes.find(c => c.day === day && c.hour === hour);
              return (
                <div
                  key={`${day}-${hour}`}
                  className={`day-cell slot ${cls ? 'has-class' : ''}`}
                  onClick={() => !cls && handleSlotClick(day, hour)}
                >
                  {cls && (
                    <div
                      className="class"
                      onClick={(e) => { e.stopPropagation(); handleClassClick(cls.id); }}
                      title={cls.title}
                    >
                      {cls.title}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Modal for adding a new class */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add Class"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Class</h2>
        {selectedSlot && (
          <p>
            {selectedSlot.day} at {selectedSlot.hour < 10 ? `0${selectedSlot.hour}:00` : `${selectedSlot.hour}:00`}
          </p>
        )}
        <input
          type="text"
          value={newClassTitle}
          onChange={(e) => setNewClassTitle(e.target.value)}
          placeholder="Class Title"
        />
        <div className="modal-buttons">
          <button onClick={handleModalSubmit}>Add Class</button>
          <button onClick={handleModalClose} className="cancel">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default ScheduleEvaluator;
