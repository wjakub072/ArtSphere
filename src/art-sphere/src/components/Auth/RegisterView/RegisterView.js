import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { validateEmail } from "../../../helpers/validation";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const RegisterView = () => {
  useWebsiteTitle("Rejestracja");
  const { register, responseError, setResponseError, setSesionError } =
    useContext(AuthContext);

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
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!email.length < 1 && !pass.length < 1 && !pass2.length < 1) {
      await register(data, loginData);
    } else {
      if (email.length < 1) {
        setEmailErrors("Pole nie może być puste");
      }
      if (pass.length < 1) {
        setPasswordErrors("Pole nie może być puste");
      }
      if (pass2.length < 1) {
        setPasswordErrors2("Pole nie może być puste");
      }
    }
  };

  return (
    <div className="mt-20 w-full px-6 sm:w-2/3 md:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto">
      <form
        onSubmit={submitHandler}
        className="bg-zinc-200 rounded-lg p-6 mx-auto shadow-lg"
      >
        <h2 className="text-indigo-700 font-bold mb-4 text-2xl text-center tracking-widest">
          Rejestracja
        </h2>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-base"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={`block appearance-none w-full !border py-3 px-3 leading-tight rounded-xl focus:outline-none ${
                emailErrors ? "border-red-500" : ""
              }`}
              type="text"
              id="email"
              name="email"
              placeholder="Adres email"
            />
            {emailErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{emailErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-base"
            htmlFor="password"
          >
            Hasło
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className={`block appearance-none w-full !border py-3 px-3 leading-tight rounded-xl focus:outline-none ${
                passwordErrors ? "border-red-500" : ""
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
            {passwordErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{passwordErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-base"
            htmlFor="password2"
          >
            Powtórz hasło
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPass2(e.target.value)}
              value={pass2}
              className={`block appearance-none w-full !border py-3 px-3 leading-tight rounded-xl focus:outline-none ${
                passwordErrors2 ? "border-red-500" : ""
              }`}
              type="password"
              id="password2"
              name="password2"
              placeholder="********"
            />
            {passwordErrors2 && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">
            {passwordErrors2}
          </div>
        </div>

        <div className="flex items-center mb-3">
          <input
            className="w-4 h-4 m-2 accent-indigo-600 bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600 focus:outline-none "
            value={check}
            onChange={(e) => setCheck(e.target.checked)}
            type="checkbox"
            id="artist"
            name="artist"
          />
          <label
            className="text-indigo-600 px-2 pb-1 text-base"
            htmlFor="artist"
          >
            Czy jesteś artystą?
          </label>
        </div>

        {responseError && (
          <p className="text-red-500 text-base text-center my-3 font-medium">
            {responseError}
          </p>
        )}

        <div>
          <button className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none transition-colors">
            Zarejestruj się
          </button>

          <p className="text-base text-center">
            <NavLink
              to={"/logowanie"}
              className="text-indigo-600 underline m-2 hover:text-indigo-900 focus:text-indigo-900 focus:outline-none transition-colors"
            >
              Masz już konto? Zaloguj się!
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
