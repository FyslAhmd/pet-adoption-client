import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/router";
import AuthProvider from "./Context/AuthProvider";
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
