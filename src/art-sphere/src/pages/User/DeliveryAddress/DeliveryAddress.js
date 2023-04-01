import React from 'react';
import useWebsiteTitle from '../../../hooks/useWebsiteTitle';
import './DeliveryAddress.css';

const DeliveryAddress = () => {
  useWebsiteTitle('Adres dostawy');
  return (
    <div className="user-delivery-address-wrap">
        <h2>Adres dostawy</h2>
        <form className="delivery-address-form">
          <label className='text-primary m-3'>
            Imię
            <input className='form-control' type="text" placeholder="Imię"/>
          </label>
          <label className='text-primary m-3'>
            Nazwisko 
            <input className='form-control' type="text" placeholder="Nazwisko"/>
          </label>
          <label className='text-primary m-3'>
            Numer telefonu
            <input className='form-control' type="text" placeholder="Numer telefonu"/>
          </label>
          <label className='text-primary m-3'>
           Ulica
            <input className='form-control' type="text" placeholder="Ulica"/>
          </label>
          <label className='text-primary m-3'>
            Numer domu
            <input className='form-control' type="text" placeholder="Numer domu"/>
          </label>
          <label className='text-primary m-3'>
            Numer lokalu
            <input className='form-control' type="text" placeholder="Numer lokalu"/>
          </label>
          <label className='text-primary m-3'>
            Kod pocztowy
            <input className='form-control' type="text" placeholder="Kod pocztowy"/>
          </label>
          <label className='text-primary m-3'>
            Miasto
            <input className='form-control' type="text" placeholder="Miasto"/>
          </label>
          <label className='text-primary m-3'>
            Kraj
            <input className='form-control' type="text" placeholder="Polska" value="Polska"/>
          </label>
          <label className='text-primary m-3'>
            <select class="form-select">
              <option selected>Wybierz Kraj</option>
              <option value="1">Polska</option>
              <option value="2">Czehy</option>
              <option value="3">Niemcy</option>
            </select>
          </label>
          
          <input className='btn btn-primary ' type="submit" value="Zapisz dane adresowe"/>
        </form>
    </div>
  );
}
export default DeliveryAddress;