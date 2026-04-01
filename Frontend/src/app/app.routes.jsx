import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";

import GamePage from "../features/game/pages/GamePage";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        {/* <Dashboard /> */}
        <GamePage />
      </Protected>
    ),
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />
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
