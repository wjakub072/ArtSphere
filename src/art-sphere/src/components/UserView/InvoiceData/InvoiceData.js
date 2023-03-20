import React from "react";
import './invoiceData.css';

const InvoiceData = () => {
  return (
    <div className="user-invoice-data-wrap">
        <h2>Dane do faktury</h2>
        <form className="invoice-data-form">
          <label>
            Nazwa firmy
            <input type="text" placeholder="Nazwa firmy"/>
          </label>
          <label>
            NIP 
            <input type="text" placeholder="NIP"/>
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
          

          <input type="submit" value="Zapisz dane do faktury"/>
        </form>
    </div>
  );
}

export default InvoiceData;