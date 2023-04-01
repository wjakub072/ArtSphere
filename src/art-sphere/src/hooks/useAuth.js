import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
  const authContext = useContext(AuthContext);

  const auth = authContext.user;

  useDebugValue(auth ? 'Zalogowany' : 'Wylogowany');

  const setAuth = (user) => {
    if (user) {
      //login
      authContext.login(user);
      window.localStorage.setItem('user-logged', JSON.stringify(user));
    }
    else {
      //logout
      authContext.logout();
      window.localStorage.removeItem('user-logged');
    }
  }

  return [auth, setAuth];
}