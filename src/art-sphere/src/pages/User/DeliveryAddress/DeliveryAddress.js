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
  const [phoneErrors, setPhoneErrors] = useState("");
  const [streetErrors, setStreetErrors] = useState("");
  const [homenrErrors, setHomenrErrors] = useState("");
  const [flatnrErrors, setFlatnrErrors] = useState("");
  const [postcodeErrors, setPostcodeErrors] = useState("");
  const [cityErrors, setCityErrors] = useState("");
  const [countryErrors, setCountryErrors] = useState("");

  useEffect(() => {
    if (name.length < 1) {
      setNameErrors("Imię - Pole nie może być puste");
    }
  }, [name]);

  useEffect(() => {
    if (surname.length < 1) {
      setSurnameErrors("Nazwisko - Pole nie może być puste");
    }
  }, [surname]);

  useEffect(() => {
    if (phone.length < 1) {
      setPhoneErrors("Numer telefonu - Pole nie może być puste");
    }
  }, [phone]);

  useEffect(() => {
    if (street.length < 1) {
      setStreetErrors("Ulica - Pole nie może być puste");
    }
  }, [street]);

  useEffect(() => {
    if (homenr.length < 1) {
      setHomenrErrors("Numer domu - Pole nie może być puste");
    }
  }, [homenr]);

  useEffect(() => {
    if (flatnr.length < 1) {
      setFlatnrErrors("Numer lokalu - Pole nie może być puste");
    }
  }, [flatnr]);

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

  useEffect(() => {
    if (city.length < 1) {
      setCityErrors("Miasto - Pole nie może być puste");
    }
  }, [city]);

  useEffect(() => {
    if (country.length < 1) {
      setCountryErrors("Kraj - Pole nie może być puste");
    }
  }, [country]);

  useEffect(() => {
    setNameErrors("");
    setSurnameErrors("");
    setPhoneErrors("");
    setStreetErrors("");
    setHomenrErrors("");
    setFlatnrErrors("");
    setPostcodeErrors("");
    setCityErrors("");
    setCountryErrors("");
  }, []);

  useEffect(() => {
    return () => setResponseError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-delivery-address-wrap">
      <h2>Adres dostawy</h2>
      <form className="delivery-address-form">
        <label className="text-primary m-3">
          Imię
          <input
            className={`form-control loginForm ${
              nameErrors ? "is-invalid" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Imię"
            />
            <div className="invalid-feedback">{nameErrors}</div>
        </label>
        <label className="text-primary m-3">
          Nazwisko
          <input
            className={`form-control loginForm ${
              surnameErrors ? "is-invalid" : ""
            }`}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder="Nazwisko"
            />
            <div className="invalid-feedback">{surnameErrors}</div>
        </label>
        <label className="text-primary m-3">
          Numer telefonu
          <input
            className={`form-control loginForm ${
              phoneErrors ? "is-invalid" : ""
            }`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Numer telefonu"
          />
          <div className="invalid-feedback">{phoneErrors}</div>
        </label>
        <label className="text-primary m-3">
          Ulica
          <input
            className={`form-control loginForm ${
              streetErrors ? "is-invalid" : ""
            }`}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            placeholder="Ulica"
            />
            <div className="invalid-feedback">{streetErrors}</div>
        </label>
        <label className="text-primary m-3">
          Numer domu
          <input
            className={`form-control loginForm ${
              homenrErrors ? "is-invalid" : ""
            }`}
            value={homenr}
            onChange={(e) => setHomenr(e.target.value)}
            type="text"
            placeholder="Numer domu"
          />
          <div className="invalid-feedback">{homenrErrors}</div>
        </label>
        <label className="text-primary m-3">
          Numer lokalu
          <input
            className={`form-control loginForm ${
              flatnrErrors ? "is-invalid" : ""
            }`}
            value={flatnr}
            onChange={(e) => setFlatnr(e.target.value)}
            type="text"
            placeholder="Numer lokalu"
          />
          <div className="invalid-feedback">{flatnrErrors}</div>
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
          <input
            className={`form-control loginForm ${
              cityErrors ? "is-invalid" : ""
            }`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Miasto" />
            <div className="invalid-feedback">{cityErrors}</div>
        </label>
        <label className="text-primary m-3">
          Kraj
          <input
            className={`form-control loginForm ${
              countryErrors ? "is-invalid" : ""
            }`}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="Polska"
          />
          <div className="invalid-feedback">{countryErrors}</div>
        </label>
        <label className="text-primary m-3">
          <select class="form-control">
            <option value="" selected>Wybierz Kraj</option>
            <option value="1">Polska</option>
            <option value="2">Czehy</option>
            <option value="3">Niemcy</option>
          </select>
        </label>

        {responseError && (
          <p className="text-danger text-center mt-3 mb-0">{responseError}</p>
        )}

        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          type="submit"
          value="Zapisz dane adresowe"
        />
      </form>
    </div>
  );
};
export default DeliveryAddress;
