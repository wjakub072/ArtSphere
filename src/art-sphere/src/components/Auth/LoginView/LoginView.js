import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import { validateEmail } from "../../../helpers/validation";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

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
    <div className="mt-20 w-full px-6 sm:w-2/3 md:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto">
      <form
        onSubmit={submitHandler}
        className="bg-zinc-200 rounded-lg p-6 mx-auto shadow-lg"
      >
        <h2 className="text-indigo-700 font-bold mb-4 text-2xl text-center tracking-widest">
          Logowanie
        </h2>
        {sesionError && (
          <p className="text-red-500 text-base text-center mt-3 mb-4">
            {sesionError}
          </p>
        )}

        <div className="mb-4">
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={`block appearance-none w-full !border py-3 px-3 leading-tight rounded-xl focus:outline-none ${
                emailErrors ? "border-red-500" : ""
              }`}
              type="text"
              id="email"
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

        <div className="mb-4">
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={`block appearance-none w-full !border py-3 px-3 leading-tight rounded-xl focus:outline-none ${
                passwordErrors ? "border-red-500" : ""
              }`}
              type="password"
              id="password"
              placeholder="Hasło"
            />
            {passwordErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>

          <div className="text-red-500 text-sm ml-2 mt-1">{passwordErrors}</div>
        </div>

        {responseError && (
          <p className="text-red-500 text-base text-center my-3 font-medium">
            {responseError}
          </p>
        )}

        <div>
          <button className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none transition-colors">
            Zaloguj się
          </button>
          <p className="text-base text-center m-2">
            <NavLink
              to={"/logowanie/odzyskiwanieHasla"}
              className="text-indigo-600 underline m-2 hover:text-indigo-900 focus:text-indigo-900 focus:outline-none transition-colors"
            >
              Nie pamiętam hasła
            </NavLink>
          </p>

          <p className="text-base text-center">
            <NavLink
              to={"/rejestracja"}
              className="text-indigo-600 underline m-2 hover:text-indigo-900 focus:text-indigo-900 focus:outline-none transition-colors"
            >
              Nie masz konta? Zarejestruj się!
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginView;
