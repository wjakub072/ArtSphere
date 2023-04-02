import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import "./UserNav.css";

const UserViewNav = (props) => {
  const { logout } = useContext(AuthContext);
  const url = "/profil";
  return (
    <div className="user-menu-wrap">
      <ul className="user-menu nav">
        <li className="nav-item">
          <NavLink
            to={`${url}/`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Profil
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/mojeZakupy`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Moje zakupy
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/ulubione`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Ulubione
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/doladujPortfel`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Doładuj portfel
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/adresDostawy`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Adres dostawy
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/daneDoFaktury`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Dane do faktury
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/ustawieniaKonta`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Ustawienia konta
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/twojeDziela`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Twoje dzieła
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`${url}/panelAdministratora`}
            style={({ isActive }) => (isActive ? { color: "red" } : {})}
            className="nav-link"
          >
            Panel Administratora
          </NavLink>
        </li>
        <li className="nav-item">
          <button onClick={() => logout()} className="nav-link">
            Wyloguj
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserViewNav;
