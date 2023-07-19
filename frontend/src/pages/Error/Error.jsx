import { Link, useRouteError } from "react-router-dom";
import style from "./Error.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={style.errorPage}>
      <h1 className={style.title}>Oops!</h1>
      <p className={style.p}>Sorry, an unexpected error has occurred.</p>
      <p className={style.p}>
        <i className={style.i}>{error.statusText || error.message}</i>
      </p>
      <p className={style.p}>
        <Link to="/" className={style.link}>
          {" "}
          ➡️ Go back to the home page ⬅️
        </Link>
      </p>
    </div>
  );
}
