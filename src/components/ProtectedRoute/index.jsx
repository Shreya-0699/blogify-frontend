import React from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate, Route } from "react-router-dom";

export default function ProtectedRoute({ component }) {
  const { isAuthenticated: authStatus } = React.useContext(AuthContext);
  console.log("ProtectedRoute authStatus:", AuthContext);
  return authStatus ? component : <Navigate to="/login" replace />;
}
