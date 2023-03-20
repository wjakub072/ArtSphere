import React from "react";
import './accountSettings.css';

const AccountSettings = () => {
  return (
    <div className="user-account-settings-wrap">
        <h2>Ustawienia konta</h2>
        <h3>Zmień hasło</h3>
        <form className="password-change-form">
          <input type="password" placeholder="Aktualne hasło"/>
          <input type="password" placeholder="Nowe hasło"/>
          <input type="password" placeholder="Potwierdź hasło"/>
          <input type="submit" value="Zmień hasło"/>
        </form>
        <h3>Zmień e-mail</h3>
        <form className="email-change-form">
          <input type="text" placeholder="e-mail"/>
          <input type="submit" value="Zmień e-mail"/>
        </form>
        <h3>Usuwanie konta</h3>
        <input type="button" value="Usuń konto"/>
    </div>
  );
}

export default AccountSettings;