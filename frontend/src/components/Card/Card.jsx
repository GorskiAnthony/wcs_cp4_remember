import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import JSConfetti from "js-confetti";
import * as dayTrim from "../../services/calculeDate.services";
import style from "./Card.module.css";
import { useUser } from "../../context/UserContext";

export default function Card({
  friend_name: friendName,
  birthday,
  be,
  id_friend: idFriend,
}) {
  const tempsRestant = dayTrim.calculerTempsRestant(dayTrim.trimDate(birthday));
  const [hb, setHB] = useState(false);
  const jsConfetti = new JSConfetti();
  const { isView, setIsView } = useUser();

  useEffect(() => {
    if (tempsRestant.jours === 0 && !isView) {
      jsConfetti.addConfetti({
        emojis: ["🎉", "🎊", "🎈", "💃", "🍾", "🥂"],
      });
      setIsView(true);
    }
  }, []);

  if (tempsRestant.jours === 0 && !hb) {
    setHB(true);
  }

  return (
    <div
      className={`p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${
        hb ? style.animePulse : ""
      }`}
    >
      <span className="flex justify-between py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 004.875-4.875V12m6.375 5.25a4.875 4.875 0 01-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 013.182 3.182zM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 113.182-3.182z"
          />
        </svg>{" "}
        J- {tempsRestant.jours}
      </span>
      <span className="flex justify-between py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {friendName}
      </span>
      <span className="flex justify-between py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>

        {be}
      </span>
      <span className="flex justify-between py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <Link
          to={`/edit/friends/${idFriend}`}
          type="button"
          className="inline-flex items-center rounded-md text-sm font-semibold text-indigo-500 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Modifier
        </Link>
      </span>
    </div>
  );
}

Card.propTypes = {
  friend_name: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  be: PropTypes.string.isRequired,
  id_friend: PropTypes.number.isRequired,
};
