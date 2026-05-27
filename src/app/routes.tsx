import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Chatbot } from "./pages/Chatbot";
import { CoursesTree } from "./pages/CoursesTree";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/chat" replace />
      },
      {
        path: "chat",
        element: <Chatbot />
      },
      {
        path: "courses",
        element: <CoursesTree />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  }
]);
