import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import ProfessorDatabase from "./pages/ProfessorDatabase";
import ScheduleEvaluator from "./pages/ScheduleEvaluator";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/professor-database" element={<ProfessorDatabase />} />
          <Route path="/schedule-evaluator" element={<ScheduleEvaluator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
