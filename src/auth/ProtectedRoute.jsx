import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />; 
  }

  return children; 
};

export default ProtectedRoute;
