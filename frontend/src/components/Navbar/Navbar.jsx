import { NavLink, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import * as Auth from "../../services/form.service";
import style from "./Navbar.module.css";
import { toastifySuccess } from "../../services/toast.service";

export default function Navbar() {
  const { user, handleUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Auth.logout("/users/logout");
    handleUser(null);
    toastifySuccess("Vous êtes déconnecté");
    navigate("/");
  };

  return (
    <nav className={style.nav}>
      <h1>
        <Link to="/" activeclassname={style.active}>
          Remember
        </Link>
      </h1>
      <div className={style.links}>
        {user ? (
          <>
            <NavLink to="/dashboard" activeclassname={style.active}>
              Dashboard
            </NavLink>
            <NavLink to="/profil" activeclassname={style.active}>
              Mon profil
            </NavLink>
            <NavLink to="/friends/users" activeclassname={style.active}>
              Mes amis
            </NavLink>
            <button onClick={handleLogout} type="button">
              <span className="flex">
                {user.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <>
            <NavLink to="/" activeclassname={style.active}>
              Késako?
            </NavLink>
            <NavLink to="/login" activeclassname={style.active}>
              Connexion
            </NavLink>
            <NavLink to="/register" activeclassname={style.active}>
              Inscription
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
