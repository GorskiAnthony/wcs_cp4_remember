import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <h1>Remember</h1>
      <div className={style.links}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}
