import { useFadeIn } from "../hooks/useFadeIn";
import "./Home.css";
import bDrone from "/BostonDrone.mp4";

function Home() {
  const fadeIn = useFadeIn(100);

  return (
    <div className={`home fade-in ${fadeIn ? "show" : ""}`}>
      <video src={bDrone} autoPlay loop muted id="BGVideo" />
      <div className="overlay" />
      <div className="content">
        <h1>Schedule Evaluation</h1>
        <h2>Made Easy</h2>
        <p>
          <em>
            Explore professors for a course and get advanced course insights to
            plan ahead for your next semester
          </em>
        </p>
      </div>
    </div>
  );
}

export default Home;
