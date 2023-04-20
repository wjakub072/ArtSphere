import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./PasswordRecovery.css";
import { validateEmail } from "../../../helpers/validation";

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState("");

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
    setEmailErrors("");
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email.length < 1) {
      console.log("git");
    } else {
      if (email.length < 1) {
        setEmailErrors("Pole nie może być puste");
      }
    }
  };

  return (
    <div className="login-form-container mt-5">
      <form onSubmit={submitHandler} className="bg-dark-subtle rounded-3 p-3">
        <h1 className="passwordRecovery text-primary">Odzyskiwanie hasła</h1>
        <div className="passwordRecovery">
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
        </div>
        <div className="passwordRecovery">
          <button className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white my-3 py-2 px-4 rounded disabled:opacity-50">
            Wyślij email zmiany hasła
          </button>
        </div>
        <p className="passwordRecovery">
          <NavLink
            to={"/logowanie"}
            className="btn nav-link text-primary text-decoration-underline m-2"
          >
            Wróć do logowania
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default PasswordRecovery;
