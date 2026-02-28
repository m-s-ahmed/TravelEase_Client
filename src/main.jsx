import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./components/Home/Home.jsx";
import AllVehicles from "./components/AllVehicles/AllVehicles.jsx";
import AddVehicles from "./components/AddVehicles/AddVehicles.jsx";
import MyVehicles from "./components/MyVehicles/MyVehicles.jsx";
import MyBookings from "./components/MyBookings/MyBookings.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import VehiclesDetails from "./components/VehiclesDetails/VehiclesDetails.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import { Toaster } from "react-hot-toast";
import UpdateVehicle from "./components/UpdateVehicle/UpdateVehicle.jsx";

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
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/allvehicles",
        element: <AllVehicles></AllVehicles>,
      },
      {
        path: "/addvehicles",
        element: (
          <PrivateRoute>
            <AddVehicles></AddVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "/myvehicles",
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "/mybookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      { path: "all-vehicles", element: <AllVehicles></AllVehicles> },
      {
        path: "vehicles/:id",
        element: (
          <PrivateRoute>
            <VehiclesDetails></VehiclesDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "update-vehicle/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>,
);
