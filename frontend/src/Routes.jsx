import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserDetails from "./components/Users/UserDetails";
import UserEditForm from "./components/Users/UserEditForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <UserDetails isEditUser />,
      },
      {
        path: "/edit",
        element: <UserEditForm />,
      },
      {
        path: "/:id",
        element: <UserDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
