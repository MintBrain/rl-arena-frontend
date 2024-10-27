import { NavLink } from "react-router-dom";
import "./Navigation.css";

export function Navigation() {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`}>Login</NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`}>Register</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}