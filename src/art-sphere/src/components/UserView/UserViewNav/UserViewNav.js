import React from "react";
import './userViewNav.css';

const UserViewNav = ({active}) => {

  const changeContent = (e, title) => {
    e.preventDefault();
    active(title);
  }
  return(
    <div className="user-menu-wrap">
        <ul className="user-menu">
          <li>
            <a href="#0" onClick = { e => changeContent(e, "Profile")}>Profil</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "ShoppingHistory")}>Moje zakupy</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "Favorite")}>Ulubione</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "TopUpWallet")}>Doładuj portfel</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "DeliveryAddress")}>Adres dostawy</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "InvoiceData")}>Dane do faktury</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "AccountSettings")}>Ustawienia konta</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "UserArts")}>Twoje dzieła</a>
          </li>
          <li>
            <a href="#0" onClick = { e => changeContent(e, "AdminPanel") }>Panel Administratora</a>
          </li>
          <li>
            <a href="#0">Wyloguj się</a>
          </li>
        </ul>
      </div>
  );
}

export default UserViewNav;