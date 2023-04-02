import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import style from './Menu.module.css';

function Menu() {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-dark">
      <ul className={`nav p-3 justify-content-center`}>
        <li className="nav-item">
          <NavLink
            to={'/'}
            style={({ isActive }) => (
              isActive ? { color: 'red'} : {}
            )}
            className={`${style.font} nav-link`}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to={'/galeria'}
            style={({ isActive }) => (
                isActive ? { color: 'red'} : {}
              )}
             className={`${style.font} nav-link`}>Galeria</NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={'/artysci'}
            style={({ isActive }) => (
                isActive ? { color: 'red'} : {}
              )}
            className={`${style.font} nav-link`}>Artyści</NavLink>
        </li>
        {!user &&
          <li className="nav-item">
            <NavLink
              to={'/logowanie'}
              style={({ isActive }) => (
                  isActive ? { color: 'red'} : {}
                )}
              className={`${style.font} nav-link`}>Logowanie</NavLink>
          </li>
        }
        {!user &&
          <li className="nav-item">
            <NavLink
              to={'/rejestracja'}
              style={({ isActive }) => (
                  isActive ? { color: 'red'} : {}
                )}
              className={`${style.font} nav-link`}>Rejestracja</NavLink>
          </li>
        }
        {user &&
          <li className="nav-item">
            <NavLink
              to={'/profil'}
              style={({ isActive }) => (
                  isActive ? { color: 'red'} : {}
                )}
              className={`${style.font} nav-link`}>Profil</NavLink>
          </li>
        }
        {user &&
          <li className="nav-item">
            <button
              className={`${style.font} nav-link`}
              onClick = {() => logout()}
              >Wyloguj</button>
          </li>
        }
      </ul>
    </nav>
  );
}

export default Menu;