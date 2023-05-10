import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import { validateEmail } from "../../../helpers/validation";
import "./LoginView.css";

function LoginView() {
  useWebsiteTitle("Logowanie");
  const { login, responseError, setResponseError, sesionError } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  useEffect(() => {
    if (email.length < 1) {
      setEmailErrors("Pole nie może być puste");
    } else if (validateEmail(email)) {
      setEmailErrors("");
    } else {
      setEmailErrors("Niepoprawny email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (password.length < 1) {
      setPasswordErrors("Pole nie może być puste");
    } else {
      setPasswordErrors("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    setEmailErrors("");
    setPasswordErrors("");
  }, []);

  useEffect(() => {
    return () => {
      setResponseError("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    if (!email.length < 1 && !password.length < 1) {
      await login(data);
    } else {
      if (email.length < 1) {
        setEmailErrors("Pole nie może być puste");
      }
      if (password.length < 1) {
        setPasswordErrors("Pole nie może być puste");
      }
    }
  };

  return (
    <div className="login-form-container mt-5">
      <form onSubmit={submitHandler} className="bg-dark-subtle rounded-3 p-3">
        <h2 className="loginForm text-primary">Logowanie</h2>
        {sesionError && (
          <p className="text-danger text-center mt-3 mb-0">{sesionError}</p>
        )}

        <div className="form-group">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={`form-control loginForm ${
              emailErrors ? "is-invalid" : ""
            }`}
            type="email"
            id="email"
            placeholder="Adres email"
          ></input>
          <div className="invalid-feedback">{emailErrors}</div>
        </div>

        <div className="form-group">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={`form-control loginForm ${
              passwordErrors ? "is-invalid" : ""
            }`}
            type="password"
            id="password"
            placeholder="Hasło"
          ></input>
          <div className="invalid-feedback">{passwordErrors}</div>
        </div>

        {responseError && (
          <p className="text-danger text-center mt-3 mb-0">{responseError}</p>
        )}
        <div className="loginForm">
          <button className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white my-3 py-2 px-4 rounded disabled:opacity-50">
            Zaloguj się
          </button>
        </div>
        <p className="loginForm">
          <NavLink
            to={"/logowanie/odzyskiwanieHasla"}
            className="btn nav-link text-primary text-decoration-underline m-2"
          >
            Nie pamiętam hasła
          </NavLink>
        </p>

        <NavLink
          to={"/rejestracja"}
          className="btn nav-link text-primary text-decoration-underline m-2"
        >
          Nie masz konta? Zarejestruj się!
        </NavLink>
      </form>
    </div>
  );
}

export default LoginView;
