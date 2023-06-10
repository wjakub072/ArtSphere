import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, accesBy, role }) => {
  const { user } = useContext(AuthContext);

  if (accesBy === "non-authenticated") {
    if (!user) {
      return children;
    }
  } else if (accesBy === "authenticated") {
    if (user) {
      if (role === "klient") {
        if (
          user === "klient" ||
          user === "artysta" ||
          user === "administrator"
        ) {
          return children;
        }
      } else if (role === "artysta") {
        if (
          user === "artysta" &&
          user !== "klient" &&
          user !== "administrator"
        ) {
          return children;
        }
      } else if (role === "administrator") {
        if (
          user === "administrator" &&
          (user !== "klient" || user !== "artysta")
        ) {
          return children;
        }
      }
    }
  }
  return <Navigate to={"/"} replace></Navigate>;
};

export default ProtectedRoute;
