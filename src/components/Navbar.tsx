import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useFadeIn } from "../hooks/useFadeIn";
import "./Navbar.css";

function Navbar() {
  const fadeIn = useFadeIn(100);

  return (
    <nav className={`navbar fade-in ${fadeIn ? "show" : ""}`}>
      <Link to="/home" className="site-title">
        Schedulytics
      </Link>
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/professor-database">Professor Database</CustomLink>
        <CustomLink to="/schedule-evaluator">Schedule Evaluator</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  );
}

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

function CustomLink({ to, children }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
