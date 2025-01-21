import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";


const RoutesComponent = () => {
  return (
    <Routes>
       {/* Protected Route for Home */}
       <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
  );
};

export default RoutesComponent;
