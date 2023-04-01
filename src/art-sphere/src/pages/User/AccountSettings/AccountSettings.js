import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import { validateEmail } from "../../../helpers/validation";
import './AccountSettings.css';

const AccountSettings = () => {
  useWebsiteTitle('Ustawienia konta');
  const { deleteAccount, setResponseError } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [passwordErrors2, setPasswordErrors2] = useState("");

  const buttonDisabledEmail = () => {
    if (emailErrors === "") {
      return false;
    } else {
      return true;
    }
  }

  const buttonDisabledPassword = () => {
    if (passwordErrors === "" && passwordErrors2 === "") {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    if (email.length < 1) {
        setEmailErrors("Email - Pole nie może być puste");
      }
      else if (validateEmail(email)) {
        setEmailErrors("");
      }
      else {
        setEmailErrors("Niepoprawny email");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [email]);

 useEffect(() => {
    if (pass.length < 1) {
      setPasswordErrors("Hasło - Pole nie może być puste");
    }
    else if (pass.search(/[a-z]/) < 0 || pass.search(/[A-Z]/) < 0 || pass.search(/[0-9]/) < 0) {
      setPasswordErrors("Muszą być duże i małe litery oraz liczby");
    }
    else if (pass.length > 7) {
      setPasswordErrors("");
    } 
    else {
      setPasswordErrors("Wymagane 8 znaków");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass]);

  useEffect(() => {
    if (pass2.length < 1) {
        setPasswordErrors2("Hasło - Pole nie może być puste");
      }
    else if (pass2.length === pass.length) {
        setPasswordErrors2("");
    }
    else {
        setPasswordErrors2("Należy wpisać hasło ponownie");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pass2]);

  useEffect(() => {
    setEmailErrors("");
    setPasswordErrors("");
  }, [])

  useEffect(() => {
    return () => setResponseError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = async () => {
    await deleteAccount();
  }

  return (
    <div className="user-account-settings-wrap">
        <h2>Ustawienia konta</h2>
        <h3>Zmień hasło</h3>
        <form className="password-change-form m-3">
          <input
            className={`form-control loginForm ${
              passwordErrors ? "is-invalid" : ""
            }`}
            value={pass}
            type="password"
            placeholder="Aktualne hasło"/>
          <input
            className={`form-control loginForm ${
              passwordErrors ? "is-invalid" : ""
            }`}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Nowe hasło"/>
          <div className="invalid-feedback">{passwordErrors}</div>
          <input
            className={`form-control loginForm ${
              passwordErrors2 ? "is-invalid" : ""
            }`}
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            type="password"
            placeholder="Potwierdź hasło"/>
          <div className="invalid-feedback">{passwordErrors2}</div>
          <input
            className='btn btn-primary'
            disabled={buttonDisabledPassword()}
            type="submit"
            value="Zmień hasło"/>
        </form>

        <h3>Zmień e-mail</h3>
        <form className="email-change-form m-3">
          <input
            className={`form-control loginForm ${
              emailErrors ? "is-invalid" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="e-mail"/>
          <div className="invalid-feedback">{emailErrors}</div>
          <input
            className='btn btn-primary'
            disabled={buttonDisabledEmail()}
            type="submit"
            value="Zmień e-mail"/>
        </form>
        <h3>Usuwanie konta</h3>
        <input className='btn btn-primary' onClick={clickHandler} type="button" value="Usuń konto"/>
    </div>
  );
}

export default AccountSettings;