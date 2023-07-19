import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./tailwind.css";
import Layout from "./pages/Layout";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Friends from "./pages/Friends/Friends";
import Friend from "./pages/Friends/Friend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/edit/friends/:id", element: <Friend /> },
      { path: "/friends/users", element: <Friends /> },
    ],
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
