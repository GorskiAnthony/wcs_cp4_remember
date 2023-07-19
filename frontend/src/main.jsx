import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import App from "./App";
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    <ToastContainer />
  </React.StrictMode>
);
