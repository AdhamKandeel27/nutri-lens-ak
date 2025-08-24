import React from "react";
import LoginPage from "../pages/LoginPage";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
