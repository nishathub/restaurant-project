import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import ContextProvider from "./ContextProvider/ContextProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet
        defaultTitle="Savouryum"
        titleTemplate="%s | Savouryum"
      ></Helmet>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </HelmetProvider>
  </StrictMode>
);
