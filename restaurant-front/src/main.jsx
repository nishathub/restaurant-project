import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import ContextProvider from "./ContextProvider/ContextProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";
// TANSTACK QUERY
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Helmet
            defaultTitle="Savouryum"
            titleTemplate="%s | Savouryum"
          ></Helmet>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </ContextProvider>
  </StrictMode>
);
