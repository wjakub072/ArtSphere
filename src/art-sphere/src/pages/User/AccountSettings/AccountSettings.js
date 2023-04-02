import React, { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import './AccountSettings.css';

const AccountSettings = () => {
  useWebsiteTitle('Ustawienia konta');
  const { deleteAccount } = useContext(AuthContext);

  const clickHandler = async () => {
    await deleteAccount();
  }

  return (
    <div className="user-account-settings-wrap">
        <h2>Ustawienia konta</h2>
        <h3>Zmień hasło</h3>
        <form className="password-change-form m-3">
          <input className='form-control' type="password" placeholder="Aktualne hasło"/>
          <input className='form-control' type="password" placeholder="Nowe hasło"/>
          <input className='form-control' type="password" placeholder="Potwierdź hasło"/>
          <input className='btn btn-primary' type="submit" value="Zmień hasło"/>
        </form>
        <h3>Zmień e-mail</h3>
        <form className="email-change-form m-3">
          <input className='form-control' type="text" placeholder="e-mail"/>
          <input className='btn btn-primary' type="submit" value="Zmień e-mail"/>
        </form>
        <h3>Usuwanie konta</h3>
        <input className='btn btn-primary' onClick={clickHandler} type="button" value="Usuń konto"/>
    </div>
  );
}

export default AccountSettings;