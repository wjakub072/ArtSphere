import React from "react";
import './deliveryAddress.css';

const DeliveryAddress = () => {
  return (
    <div className="user-delivery-address-wrap">
        <h2>Adres dostawy</h2>
        <form className="delivery-address-form">
          <label>
            Imię
            <input type="text" placeholder="Imię"/>
          </label>
          <label>
            Nazwisko 
            <input type="text" placeholder="Nazwisko"/>
          </label>
          <label>
            Numer telefonu
            <input type="text" placeholder="Numer telefonu"/>
          </label>
          <label>
           Ulica
            <input type="text" placeholder="Ulica"/>
          </label>
          <label>
            Numer domu
            <input type="text" placeholder="Numer domu"/>
          </label>
          <label>
            Numer lokalu
            <input type="text" placeholder="Numer lokalu"/>
          </label>
          <label>
            Kod pocztowy
            <input type="text" placeholder="Kod pocztowy"/>
          </label>
          <label>
            Miasto
            <input type="text" placeholder="Miasto"/>
          </label>
          <label>
            Kraj
            <input type="text" placeholder="Polska" value="Polska"/>
          </label>
          
          <input type="submit" value="Zapisz dane adresowe"/>
        </form>
    </div>
  );
}
export default DeliveryAddress;