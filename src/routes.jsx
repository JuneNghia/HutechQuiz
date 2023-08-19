import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import AuthGuard from "./components/Auth/AuthGuard";
// import MainLayout from "./layouts/MainLayout";

const LoginPage = lazy(() => import("./views/auth/Login"));
const RegisterPage = lazy(() => import("./views/auth/Register"));
const ErrorPage = lazy(() => import("./views/errors"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        {/* <MainLayout /> */}
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    exact: true,
  },
  {
    exact: true,
    path: "/register",
    element: <RegisterPage />,
  },
  {
    exact: true,
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
