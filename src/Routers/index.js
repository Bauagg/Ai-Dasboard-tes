import { createBrowserRouter } from "react-router-dom";
import AiDashbord from "../pages/Dashboard";
import Data from "../pages/data";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AiDashbord />,
  },

  {
    path: "/data",
    element: <Data />,
  },
]);
