import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../features/auth";


const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading, true/false = token state

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsValid(false); // No token, user must sign in
        return;
      }

      const valid = await validateToken(token);
      setIsValid(valid);
    };

    checkToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>; // Loader while validating
  }

  if (!isValid) {
    return <Navigate to="/signin" replace />; // Redirect unauthenticated users
  }

  return children; // Render protected content
};

export default ProtectedRoute;
