import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

const nav = [
  {
    id: 1,
    name: "Accueil",
    path: "/",
  },
  {
    id: 2,
    name: "Connexion",
    path: "/login",
  },
  {
    id: 3,
    name: "Inscription",
    path: "/register",
  },
];

export default function Navbar() {
  return (
    <nav className={style.nav}>
      <h1>Remember</h1>
      <div className={style.links}>
        {nav.map((item) => (
          <NavLink key={item.id} to={item.path} activeclassname={style.active}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
