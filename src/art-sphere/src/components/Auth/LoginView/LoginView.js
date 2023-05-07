import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import { validateEmail } from "../../../helpers/validation";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

function LoginView() {
  useWebsiteTitle("Logowanie");
  const { login, responseError, setResponseError, sesionError, loadingButton } =
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
          {loadingButton ? (
            <button
              className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm opacity-70"
              disabled
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Logowanie...
            </button>
          ) : (
            <button className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none transition-colors">
              Zaloguj się
            </button>
          )}
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
