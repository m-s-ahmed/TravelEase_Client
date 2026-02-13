import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./components/Home/Home.jsx";
import AllVehicles from "./components/AllVehicles/AllVehicles.jsx";
import AddVehicles from "./components/AddVehicles/AddVehicles.jsx";
import MyVehicles from "./components/MyVehicles/MyVehicles.jsx";
import MyBookings from "./components/MyBookings/MyBookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allvehicles",
        element: <AllVehicles></AllVehicles>,
      },
      {
        path: "/myvehicles",
        element: <MyVehicles></MyVehicles>,
      },
      {
        path: "/mybookings",
        element: <MyBookings></MyBookings>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
