import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoutes from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import Cart from "../Pages/Dashboard/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "cart",
        element: (
          <PrivateRoutes>
            <Cart></Cart>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
