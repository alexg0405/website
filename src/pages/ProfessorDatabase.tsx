import BostonView from "../components/BostonView";
import { useFadeIn } from "../hooks/useFadeIn";

const ProfessorDatabase: React.FC = () => {
  const fadeIn = useFadeIn(100);

  return (
    <div className={`home fade-in ${fadeIn ? "show" : ""}`}>
      <div className="overlay" />
      <BostonView />
    </div>
  );
};

export default ProfessorDatabase;
