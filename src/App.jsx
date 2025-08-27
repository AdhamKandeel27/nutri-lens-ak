import React, { useState, useEffect } from "react";
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
import ProtectedRoute from "./auth/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        {/* everything under here requires auth */}

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="log-meal" element={<LogMeals />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <>
      {/* //wrap my app with  //AuthContext.Provider value = {}
    // i dont need the above since i already created an AuthPorivder funvtion that return AuthContext.Provider with value
    //wrap App with AuthProvider */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
