import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import AuthGuard from "./components/Auth/AuthGuard";
import MainLayout from "./layouts/MainLayout";

const LoginPage = lazy(() => import("./views/auth/Login"));
const HomePage = lazy(() => import("./views/home"));
const RegisterPage = lazy(() => import("./views/auth/Register"));
const ErrorPage = lazy(() => import("./views/errors"));
const PracticeTestPage = lazy(() => import("./views/practicetest"));
const PaymentPage = lazy(() => import("./views/payment"));
const WalletPage = lazy(() => import("./views/wallet"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        exact: true,
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        exact: true,
        path: "/wallet",
        element: <WalletPage />,
      },
      {
        path: "/module-m1/word",
        element: <PracticeTestPage />,
        exact: true,
      },
      {
        path: "/module-m1/excel",
        element: <PracticeTestPage />,
        exact: true,
      },
      {
        path: "/module-m1/powerpoint",
        element: <PracticeTestPage />,
        exact: true,
      },
    ],
  },
  {
    exact: true,
    path: "/login",
    element: <LoginPage />,
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
