import { useContext, useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { validateEmail } from "../../../helpers/validation";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const AccountSettings = () => {
  useWebsiteTitle("Ustawienia konta");
  const {
    deleteAccount,
    changeEmail,
    changePassword,
    passChangeResponseError,
    setPassChangeResponseError,
    emailChangeResponseError,
    setEmailChangeResponseError,
    emailChangeSuccess,
    setEmailChangeSuccess,
    passChangeSuccess,
    setPassChangeSuccess,
    loadingButton,
    loadingButtonPass,
    loadingButtonEmail,
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [emailPass, setEmailPass] = useState("");
  const [emailPassErrors, setEmailPassErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [emailErrors2, setEmailErrors2] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [passwordErrors2, setPasswordErrors2] = useState("");
  const [oldPassErrors, setOldPassErrors] = useState("");

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
    if (email2.length < 1) {
      setEmailErrors2("Pole nie może być puste");
    } else if (validateEmail(email2)) {
      setEmailErrors2("");
    } else {
      setEmailErrors2("Niepoprawny email");
    }
  }, [email2]);

  useEffect(() => {
    if (oldPass.length < 1) {
      setOldPassErrors("Pole nie może być puste");
    } else {
      setOldPassErrors("");
    }
  }, [oldPass]);

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
      setPasswordErrors2("Należy wpisać hasło ponownie");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass2]);

  useEffect(() => {
    if (emailPass.length < 1) {
      setEmailPassErrors("Pole nie może być puste");
    } else {
      setEmailPassErrors("");
    }
  }, [emailPass]);

  useEffect(() => {
    setEmailErrors("");
    setEmailErrors2("");
    setPasswordErrors("");
    setPasswordErrors2("");
    setEmailPassErrors("");
    setOldPassErrors("");
  }, []);

  useEffect(() => {
    return () => {
      setPassChangeResponseError("");
      setEmailChangeResponseError("");
      setPassChangeSuccess("");
      setEmailChangeSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const passwordClickHandler = async (e) => {
    e.preventDefault();
    const data = {
      EmailOrUserName: email,
      CurrentPassword: oldPass,
      NewPassword: pass,
    };
    if (
      !email.length < 1 &&
      !oldPass.length < 1 &&
      !pass.length < 1 &&
      !pass2.length < 1
    ) {
      await changePassword(data);
    } else {
      if (pass2.length < 1) {
        setPasswordErrors2("Pole nie może być puste");
      }
      if (pass.length < 1) {
        setPasswordErrors("Pole nie może być puste");
      }
      if (email.length < 1) {
        setEmailErrors("Pole nie może być puste");
      }
      if (oldPass.length < 1) {
        setOldPassErrors("Pole nie może być puste");
      }
    }
  };

  const emailClickHandler = async (e) => {
    e.preventDefault();
    const data = {
      CurrentPassword: emailPass,
      NewEmail: email2,
    };
    if (!email2.length < 1 && !emailPass.length < 1) {
      await changeEmail(data);
    } else {
      if (email2.length < 1) {
        setEmailErrors2("Pole nie może być puste");
      }
      if (emailPass.length < 1) {
        setEmailPassErrors("Pole nie może być puste");
      }
    }
  };

  const deleteClickHandler = async () => {
    await deleteAccount();
  };

  return (
    <div className="text-center mx-auto">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
        Ustawienia konta
      </h2>
      <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
        Zmień hasło
      </h3>
      <form>
        <div className="mb-3">
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                emailErrors ? "!border-red-500" : ""
              }`}
              type="text"
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
          <div className="relative">
            <input
              onChange={(e) => setOldPass(e.target.value)}
              value={oldPass}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                oldPassErrors ? "!border-red-500" : ""
              }`}
              type="password"
              placeholder="Aktualne hasło"
            />
            {oldPassErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{oldPassErrors}</div>
        </div>

        <div className="mb-3">
          <div className="relative">
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                passwordErrors ? "!border-red-500" : ""
              }`}
              type="password"
              placeholder="Nowe hasło"
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
          <div className="relative">
            <input
              onChange={(e) => setPass2(e.target.value)}
              value={pass2}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                passwordErrors2 ? "!border-red-500" : ""
              }`}
              type="password"
              placeholder="Potwierdź hasło"
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

        {passChangeResponseError && (
          <p className="text-red-500 text-center my-3 font-medium">
            {passChangeResponseError}
          </p>
        )}
        {passChangeSuccess && (
          <p className="text-green-800 text-center my-3 font-medium">
            {passChangeSuccess}
          </p>
        )}
        {loadingButtonPass ? (
          <button
            type="submit"
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
            Aktualizowanie...
          </button>
        ) : (
          <button
            className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
            type="submit"
            onClick={passwordClickHandler}
          >
            Zmień hasło
          </button>
        )}
      </form>

      <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
        Zmień e-mail
      </h3>
      <form>
        <div className="mb-3">
          <div className="relative">
            <input
              onChange={(e) => setEmail2(e.target.value)}
              value={email2}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                emailErrors2 ? "!border-red-500" : ""
              }`}
              type="text"
              placeholder="Adres email"
            />
            {emailErrors2 && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{emailErrors2}</div>
        </div>

        <div className="mb-3">
          <div className="relative">
            <input
              onChange={(e) => setEmailPass(e.target.value)}
              value={emailPass}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                emailPassErrors ? "!border-red-500" : ""
              }`}
              type="password"
              placeholder="Aktualne hasło"
            />
            {emailPassErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">
            {emailPassErrors}
          </div>
        </div>

        {emailChangeResponseError && (
          <p className="text-red-500 text-center my-3 font-medium">
            {emailChangeResponseError}
          </p>
        )}
        {emailChangeSuccess && (
          <p className="text-green-800 text-center my-3 font-medium">
            {emailChangeSuccess}
          </p>
        )}

        {loadingButtonEmail ? (
          <button
            type="submit"
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
            Aktualizowanie...
          </button>
        ) : (
          <button
            className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
            type="submit"
            onClick={emailClickHandler}
          >
            Zmień e-mail
          </button>
        )}
      </form>

      <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
        Usuwanie konta
      </h3>
      {loadingButton ? (
        <button
          type="submit"
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
          Usuwanie...
        </button>
      ) : (
        <button
          className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
          type="submit"
          onClick={deleteClickHandler}
        >
          Usuń konto
        </button>
      )}
    </div>
  );
};

export default AccountSettings;
