import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { validateEmail } from "../../../helpers/validation";
import "./RegisterView.css";

const RegisterView = () => {
  useWebsiteTitle("Rejestracja");
  const { register, responseError, setResponseError } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [check, setCheck] = useState(false);
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [passwordErrors2, setPasswordErrors2] = useState("");

  useEffect(() => {
    if (email.length < 1) {
      setEmailErrors("Pole nie może być puste");
    } else if (validateEmail(email)) {
      setEmailErrors("");
    } else {
      setEmailErrors("Niepoprawny email");
    }
  }, [email]);

  useEffect(() => {
    if (pass.length < 1) {
      setPasswordErrors("Pole nie może być puste");
    } else if (
      pass.search(/[a-z]/) < 0 ||
      pass.search(/[A-Z]/) < 0 ||
      pass.search(/[0-9]/) < 0
    ) {
      setPasswordErrors("Muszą być duże i małe litery oraz liczby");
    } else if (pass.length > 7) {
      setPasswordErrors("");
    } else {
      setPasswordErrors("Wymagane 8 znaków");
    }
  }, [pass]);

  useEffect(() => {
    if (pass2.length < 1) {
      setPasswordErrors2("Pole nie może być puste");
    } else if (pass2 === pass) {
      setPasswordErrors2("");
    } else {
      setPasswordErrors2("Hasła nie są identyczne");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass2]);

  useEffect(() => {
    setEmailErrors("");
    setPasswordErrors("");
    setPasswordErrors2("");
  }, []);

  useEffect(() => {
    return () => setResponseError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const role = () => (check ? "artysta" : "klient");
    const data = {
      email: email,
      password: pass,
      Role: role(),
    };
    const loginData = {
      email: email,
      password: pass,
    };
    if (!email.length < 1 && !pass.length < 1 && pass2.length < 1) {
      await register(data, loginData);
    } else {
      if (email.length < 1) {
        setEmailErrors("Pole nie może być puste");
      }
      if (pass.length < 1) {
        setPasswordErrors("Pole nie może być puste");
      }
      if (pass.length < 1) {
        setPasswordErrors2("Pole nie może być puste");
      }
    }
  };

  return (
    <div className="auth-form-container bg-dark-subtle rounded-3 mt-5 p-3">
      <h2 className=" text-primary">Rejestracja</h2>
      <form className="register-form text-primary" onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          className={`form-control loginForm ${
            emailErrors ? "is-invalid" : ""
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@gmail.com"
          id="email"
          name="email"
        />
        <div className="invalid-feedback">{emailErrors}</div>
        <label htmlFor="password">Hasło</label>
        <input
          className={`form-control loginForm ${
            passwordErrors ? "is-invalid" : ""
          }`}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <div className="invalid-feedback">{passwordErrors}</div>
        <label htmlFor="password2">Powtórz hasło</label>
        <input
          className={`form-control loginForm ${
            passwordErrors2 ? "is-invalid" : ""
          }`}
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          type="password"
          placeholder="********"
          id="password2"
          name="password2"
        />
        <div className="invalid-feedback">{passwordErrors2}</div>
        <div className="check-div">
          <input
            className="form-check-input m-2"
            value={check}
            onChange={(e) => setCheck(e.target.checked)}
            type="checkbox"
            id="artist"
            name="artist"
          />
          <label className="form-check-label" htmlFor="artist">
            Czy jesteś artystą?
          </label>
        </div>
        {responseError && (
          <p className="text-danger text-center mt-3 mb-0">{responseError}</p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          type="submit"
        >
          Rejestruj
        </button>
      </form>
      <NavLink
        to={"/logowanie"}
        className="btn nav-link text-primary text-decoration-underline m-2"
      >
        Masz już konto? Zaloguj się!
      </NavLink>
    </div>
  );
};

export default RegisterView;
