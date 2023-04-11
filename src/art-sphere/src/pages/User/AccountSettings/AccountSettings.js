import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { validateEmail } from "../../../helpers/validation";
import "./AccountSettings.css";

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
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [emailErrors2, setEmailErrors2] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [passwordErrors2, setPasswordErrors2] = useState("");

  const buttonDisabledEmail = () => {
    if (emailErrors === "") {
      return false;
    } else {
      return true;
    }
  };

  const buttonDisabledPassword = () => {
    if (passwordErrors === "" && passwordErrors2 === "") {
      return false;
    } else {
      return true;
    }
  };

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
    if (email2.length < 1) {
      setEmailErrors2("Pole nie może być puste");
    } else if (validateEmail(email2)) {
      setEmailErrors2("");
    } else {
      setEmailErrors2("Niepoprawny email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email2]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass]);

  useEffect(() => {
    if (pass2.length < 1) {
      setPasswordErrors2("Pole nie może być puste");
    } else if (pass2.length === pass.length) {
      setPasswordErrors2("");
    } else {
      setPasswordErrors2("Należy wpisać hasło ponownie");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass2]);

  useEffect(() => {
    setEmailErrors("");
    setEmailErrors2("");
    setPasswordErrors("");
    setPasswordErrors2("");
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
    await changePassword(data);
  };

  const emailClickHandler = async (e) => {
    e.preventDefault();
    const data = {
      Email: email2,
    };
    await changeEmail(data);
  };

  const deleteClickHandler = async () => {
    await deleteAccount();
  };

  return (
    <div className="user-account-settings-wrap">
      <h2>Ustawienia konta</h2>
      <h3>Zmień hasło</h3>
      <form className="password-change-form m-3">
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

        <input
          className={`form-control loginForm ${
            passwordErrors ? "is-invalid" : ""
          }`}
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          type="password"
          placeholder="Aktualne hasło"
        />

        <input
          className={`form-control loginForm ${
            passwordErrors ? "is-invalid" : ""
          }`}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Nowe hasło"
        />
        <div className="invalid-feedback">{passwordErrors}</div>

        <input
          className={`form-control loginForm ${
            passwordErrors2 ? "is-invalid" : ""
          }`}
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          type="password"
          placeholder="Potwierdź hasło"
        />
        <div className="invalid-feedback">{passwordErrors2}</div>

        {passChangeResponseError && (
          <p className="text-danger text-center mt-3 mb-0">
            {passChangeResponseError}
          </p>
        )}
        {passChangeSuccess && (
          <p className="text-success text-center mt-3 mb-0">
            {passChangeSuccess}
          </p>
        )}
        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={buttonDisabledPassword()}
          type="submit"
          value="Zmień hasło"
          onClick={passwordClickHandler}
        />
      </form>

      <h3>Zmień e-mail</h3>
      <form className="email-change-form m-3">
        <input
          className={`form-control loginForm ${
            emailErrors2 ? "is-invalid" : ""
          }`}
          value={email2}
          onChange={(e) => setEmail2(e.target.value)}
          type="text"
          placeholder="e-mail"
        />
        <div className="invalid-feedback">{emailErrors2}</div>

        {emailChangeResponseError && (
          <p className="text-danger text-center mt-3 mb-0">
            {emailChangeResponseError}
          </p>
        )}
        {emailChangeSuccess && (
          <p className="text-success text-center mt-3 mb-0">
            {emailChangeSuccess}
          </p>
        )}
        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={buttonDisabledEmail()}
          type="submit"
          value="Zmień e-mail"
          onClick={emailClickHandler}
        />
      </form>

      <h3>Usuwanie konta</h3>
      <input
        className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        onClick={deleteClickHandler}
        type="button"
        value="Usuń konto"
      />
    </div>
  );
};

export default AccountSettings;
