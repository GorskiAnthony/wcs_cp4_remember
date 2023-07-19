import { useUser } from "../../context/UserContext";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>Accueil</h1>
      <p>Welcome to the home page!</p>
      {user && <p>Bonjour {user.name}</p>}
    </div>
  );
}
