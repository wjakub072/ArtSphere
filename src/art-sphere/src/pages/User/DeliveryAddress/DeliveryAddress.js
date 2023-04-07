import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./DeliveryAddress.css";
import { validatePostcode } from "../../../helpers/validation";

const DeliveryAddress = () => {
  useWebsiteTitle("Adres dostawy");
  const { responseError, setResponseError } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [homenr, setHomenr] = useState("");
  const [flatnr, setFlatnr] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [nameErrors, setNameErrors] = useState("");
  const [surnameErrors, setSurnameErrors] = useState("");
  const [phoneErrrors, setPhoneErrors] = useState("");
  const [streetErrors, setStreetErrors] = useState("");
  const [homenrErrors, setHomenrErrors] = useState("");
  const [flatnrErrors, setFlatnrErrors] = useState("");
  const [postcodeErrors, setPostcodeErrors] = useState("");
  const [cityErrors, setCityErros] = useState("");
  const [countryErrors, setCountryErrors] = useState("");

  useEffect(() => {
    if (postcode.length < 1) {
      setPostcodeErrors("Kod pocztowy - Pole nie może być puste");
    } else if (validatePostcode(postcode)) {
      setPostcodeErrors("");
    } else {
      setPostcodeErrors("Niepoprawny kod pocztowy");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcode]);

  return (
    <div className="user-delivery-address-wrap">
      <h2>Adres dostawy</h2>
      <form className="delivery-address-form">
        <label className="text-primary m-3">
          Imię
          <input className="form-control" type="text" placeholder="Imię" />
        </label>
        <label className="text-primary m-3">
          Nazwisko
          <input className="form-control" type="text" placeholder="Nazwisko" />
        </label>
        <label className="text-primary m-3">
          Numer telefonu
          <input
            className="form-control"
            type="text"
            placeholder="Numer telefonu"
          />
        </label>
        <label className="text-primary m-3">
          Ulica
          <input className="form-control" type="text" placeholder="Ulica" />
        </label>
        <label className="text-primary m-3">
          Numer domu
          <input
            className="form-control"
            type="text"
            placeholder="Numer domu"
          />
        </label>
        <label className="text-primary m-3">
          Numer lokalu
          <input
            className="form-control"
            type="text"
            placeholder="Numer lokalu"
          />
        </label>
        <label className="text-primary m-3">
          Kod pocztowy
          <input
            className={`form-control loginForm ${
              postcodeErrors ? "is-invalid" : ""
            }`}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            type="text"
            placeholder="Kod pocztowy"
          />
          <div className="invalid-feedback">{postcodeErrors}</div>
        </label>
        <label className="text-primary m-3">
          Miasto
          <input className="form-control" type="text" placeholder="Miasto" />
        </label>
        <label className="text-primary m-3">
          Kraj
          <input
            className="form-control"
            type="text"
            placeholder="Polska"
            value="Polska"
          />
        </label>
        <label className="text-primary m-3">
          <select class="form-select">
            <option selected>Wybierz Kraj</option>
            <option value="1">Polska</option>
            <option value="2">Czehy</option>
            <option value="3">Niemcy</option>
          </select>
        </label>

        <input
          className="btn btn-primary "
          type="submit"
          value="Zapisz dane adresowe"
        />
      </form>
    </div>
  );
};
export default DeliveryAddress;
