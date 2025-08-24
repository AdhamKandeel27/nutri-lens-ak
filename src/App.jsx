import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LogMeals from "./pages/LogMeals";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="log-meal" element={<LogMeals />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
