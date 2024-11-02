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
import AllUsers from "../Pages/Dashboard/AllUsers";
import AdminRoutes from "../AdminRoutes/AdminRoutes";

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
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },
    ],
  },
]);
