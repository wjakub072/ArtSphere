import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, accesBy }) => {
  const { user } = useContext(AuthContext);

  if (accesBy === "non-authenticated") {
    if (!user) {
      return children;
    }
  } else if (accesBy === "authenticated") {
    if (user) {
      return children;
    }
  }
  return <Navigate to={"/"} replace></Navigate>;
};

export default ProtectedRoute;
