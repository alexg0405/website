// ScheduleEvaluator.tsx
import React, { useState, useEffect } from 'react';
import './ScheduleEvaluator.css';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

// Set the root element for accessibility purposes
Modal.setAppElement('#root');

// Define the structure of an Event
interface ScheduleEvent {
  id: string;
  title: string;
  day: string; // e.g., 'Monday'
  hour: number; // 0-23 representing the hour of the day
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => i); // 0 to 23

const ScheduleEvaluator: React.FC = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; hour: number } | null>(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('scheduleEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('scheduleEvents', JSON.stringify(events));
  }, [events]);

  // Handle clicking on a time slot to add an event
  const handleSlotClick = (day: string, hour: number) => {
    setSelectedSlot({ day, hour });
    setNewEventTitle('');
    setModalIsOpen(true);
  };

  // Handle clicking on an existing event to delete it
  const handleEventClick = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  // Handle modal submission to add a new event
  const handleModalSubmit = () => {
    if (selectedSlot && newEventTitle.trim() !== '') {
      const newEvent: ScheduleEvent = {
        id: uuidv4(),
        title: newEventTitle.trim(),
        day: selectedSlot.day,
        hour: selectedSlot.hour,
      };
      setEvents([...events, newEvent]);
    }
    setModalIsOpen(false);
    setSelectedSlot(null);
  };

  // Handle modal closure without adding an event
  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="schedule-evaluator">
      <h2>Weekly Schedule Evaluator</h2>
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
              {hour}:00
            </div>
            {/* Time slots for each day */}
            {daysOfWeek.map(day => {
              // Check if there's an event for this day and hour
              const event = events.find(ev => ev.day === day && ev.hour === hour);
              return (
                <div
                  key={`${day}-${hour}`}
                  className={`day-cell slot ${event ? 'has-event' : ''}`}
                  onClick={() => !event && handleSlotClick(day, hour)}
                >
                  {event && (
                    <div className="event" onClick={(e) => { e.stopPropagation(); handleEventClick(event.id); }}>
                      {event.title}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Modal for adding a new event */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        contentLabel="Add Event"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Add Event</h2>
        {selectedSlot && (
          <p>
            {selectedSlot.day} at {selectedSlot.hour}:00
          </p>
        )}
        <input
          type="text"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          placeholder="Event Title"
        />
        <div className="modal-buttons">
          <button onClick={handleModalSubmit}>Add Event</button>
          <button onClick={handleModalClose} className="cancel">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default ScheduleEvaluator;
