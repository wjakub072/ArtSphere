import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { validateEmail } from "../../../helpers/validation";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

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
    if (!email.length < 1 && validateEmail(email)) {
      console.log("git");
    } else {
      if (email.length < 1) {
        setEmailErrors("Pole nie może być puste");
      }
      if (!validateEmail(email)) {
        setEmailErrors("Niepoprawny email");
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
          Odzyskiwanie hasła
        </h2>

        <div className="mb-4">
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                emailErrors ? "!border-red-500" : ""
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

        <div>
          <button className="w-full p-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors">
            Wyślij email do zmiany hasła
          </button>
          <p className="text-base text-center m-2">
            <NavLink
              to={"/logowanie/"}
              className="text-indigo-600 underline m-2 hover:text-indigo-900 focus:text-indigo-900 p-0.5 rounded-md border-2 border-transparent focus:outline-none focus:border-indigo-600 transition-colors"
            >
              Wróć do logowania
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default PasswordRecovery;
