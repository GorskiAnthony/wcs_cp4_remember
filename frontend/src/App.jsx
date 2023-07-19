import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./tailwind.css";
import Layout from "./pages/Layout";
import Error from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <h1>Home</h1> },
      { path: "/about", element: <h1>About</h1> },
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
