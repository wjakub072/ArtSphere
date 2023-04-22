<<<<<<< HEAD
import { useState, useEffect, useContext } from "react";
import { validatePostcode } from "../../../helpers/validation";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./InvoiceData.css";
import AuthContext from "../../../context/AuthContext";

const InvoiceData = () => {
  useWebsiteTitle("Dane do faktury");
  const {
    responseError,
    setResponseError,
    responseSuccess,
    setResponseSuccess,
    invoiceData,
    updateInvoiceData,
  } = useContext(AuthContext);

  const [name, setName] = useState(
    invoiceData.companyName ? invoiceData.companyName : ""
  );
  const [nip, setNip] = useState(
    invoiceData.companyVatId ? invoiceData.companyVatId : ""
  );
  const [street, setStreet] = useState(
    invoiceData.companyAddressStreet ? invoiceData.companyAddressStreet : ""
  );
  const [homenr, setHomenr] = useState(
    invoiceData.companyAddressApartment
      ? invoiceData.companyAddressApartment
      : ""
  );
  const [flatnr, setFlatnr] = useState(
    invoiceData.companyAddressBuilding ? invoiceData.companyAddressBuilding : ""
  );
  const [postcode, setPostcode] = useState(
    invoiceData.companyAddressPostalCode
      ? invoiceData.companyAddressPostalCode
      : ""
  );
  const [city, setCity] = useState(
    invoiceData.companyAddressCity ? invoiceData.companyAddressCity : ""
  );
  const [country, setCountry] = useState(
    invoiceData.companyAddressCountry ? invoiceData.companyAddressCountry : ""
  );
=======
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./InvoiceData.css";
import { validatePostcode } from "../../../helpers/validation";

const InvoiceData = () => {
  useWebsiteTitle("Dane do faktury");

  const {
    responseError,
    setResponseError
  } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [street, setStreet] = useState("");
  const [homenr, setHomenr] = useState("");
  const [flatnr, setFlatnr] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

  const [nameErrors, setNameErrors] = useState("");
  const [nipErrors, setNipErrors] = useState("");
  const [streetErrors, setStreetErrors] = useState("");
  const [homenrErrors, setHomenrErrors] = useState("");
  const [flatnrErrors, setFlatnrErrors] = useState("");
  const [postcodeErrors, setPostcodeErrors] = useState("");
  const [cityErrors, setCityErrors] = useState("");
  const [countryErrors, setCountryErrors] = useState("");

  useEffect(() => {
    if (name.length < 1) {
<<<<<<< HEAD
      setNameErrors("Pole nie może być puste");
    } else {
      setNameErrors("");
=======
      setNameErrors("Imię - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [name]);

  useEffect(() => {
    if (nip.length < 1) {
<<<<<<< HEAD
      setNipErrors("Pole nie może być puste");
    } else {
      setNipErrors("");
=======
      setNipErrors("NIP - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [nip]);

  useEffect(() => {
    if (street.length < 1) {
<<<<<<< HEAD
      setStreetErrors("Pole nie może być puste");
    } else {
      setStreetErrors("");
=======
      setStreetErrors("Ulica - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [street]);

  useEffect(() => {
    if (homenr.length < 1) {
<<<<<<< HEAD
      setHomenrErrors("Pole nie może być puste");
    } else {
      setHomenrErrors("");
=======
      setHomenrErrors("Numer domu - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [homenr]);

  useEffect(() => {
    if (flatnr.length < 1) {
<<<<<<< HEAD
      setFlatnrErrors("Pole nie może być puste");
    } else {
      setFlatnrErrors("");
=======
      setFlatnrErrors("Numer lokalu - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [flatnr]);

  useEffect(() => {
    if (postcode.length < 1) {
<<<<<<< HEAD
      setPostcodeErrors("Pole nie może być puste");
=======
      setPostcodeErrors("Kod pocztowy - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    } else if (validatePostcode(postcode)) {
      setPostcodeErrors("");
    } else {
      setPostcodeErrors("Niepoprawny kod pocztowy");
    }
  }, [postcode]);

  useEffect(() => {
    if (city.length < 1) {
<<<<<<< HEAD
      setCityErrors("Pole nie może być puste");
    } else {
      setCityErrors("");
=======
      setCityErrors("Miasto - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [city]);

  useEffect(() => {
    if (country === "") {
<<<<<<< HEAD
      setCountryErrors("Niepoprawny kraj");
    } else {
      setCountryErrors("");
=======
      setCountryErrors("Kraj - Musisz wybrać");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [country]);

  useEffect(() => {
<<<<<<< HEAD
    return () => {
      setResponseError("");
      setResponseSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
=======
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    setNameErrors("");
    setNipErrors("");
    setStreetErrors("");
    setHomenrErrors("");
    setFlatnrErrors("");
    setPostcodeErrors("");
    setCityErrors("");
    setCountryErrors("");
  }, []);

<<<<<<< HEAD
  const clickHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      nip &&
      street &&
      homenr &&
      flatnr &&
      postcode &&
      city &&
      country
    ) {
      updateInvoiceData({
        companyName: name,
        companyVatId: nip,
        companyAddressStreet: street,
        companyAddressApartment: homenr,
        companyAddressBuilding: flatnr,
        companyAddressPostalCode: postcode,
        companyAddressCity: city,
        companyAddressCountry: country,
      });
    } else {
      if (!name) {
        setNameErrors("Pole nie może być puste");
      }
      if (!nip) {
        setNipErrors("Pole nie może być puste");
      }
      if (!street) {
        setStreetErrors("Pole nie może być puste");
      }
      if (!homenr) {
        setHomenrErrors("Pole nie może być puste");
      }
      if (!flatnr) {
        setFlatnrErrors("Pole nie może być puste");
      }
      if (!postcode) {
        setPostcodeErrors("Pole nie może być puste");
      }
      if (!city) {
        setCityErrors("Pole nie może być puste");
      }
      if (!country) {
        setCountryErrors("Niepoprawny kraj");
      }
    }
  };
=======
  useEffect(() => {
    return () => setResponseError("");
  }, []);
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

  return (
    <div className="user-invoice-data-wrap">
      <h2>Dane do faktury</h2>
      <form className="invoice-data-form">
<<<<<<< HEAD
        <label className="text-primary m-3 relative">
          Nazwa firmy
          <input
            className={`form-control w-44 loginForm ${
              nameErrors ? "is-invalid" : ""
            }`}
            placeholder="Nazwa firmy"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invalid-feedback absolute">{nameErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          NIP
          <input
            className={`form-control w-44 loginForm ${
=======
        <label className="text-primary m-3">
          Nazwa firmy
          <input
            className={`form-control loginForm ${
              nameErrors ? "is-invalid" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nazwa firmy"
          />
        </label>
        <label className="text-primary m-3">
          NIP
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              nipErrors ? "is-invalid" : ""
            }`}
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            type="text"
<<<<<<< HEAD
            placeholder="NIP"
          />
          <div className="invalid-feedback absolute">{nipErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Ulica
          <input
            className={`form-control w-44 loginForm ${
=======
            placeholder="NIP" />
            <div className="invalid-feedback">{nipErrors}</div>
        </label>
        <label className="text-primary m-3">
          Ulica
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              streetErrors ? "is-invalid" : ""
            }`}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
<<<<<<< HEAD
            placeholder="Ulica"
          />
          <div className="invalid-feedback absolute">{streetErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Numer domu
          <input
            className={`form-control w-44 loginForm ${
=======
            placeholder="Ulica" />
            <div className="invalid-feedback">{streetErrors}</div>
        </label>
        <label className="text-primary m-3">
          Numer domu
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              homenrErrors ? "is-invalid" : ""
            }`}
            value={homenr}
            onChange={(e) => setHomenr(e.target.value)}
            type="text"
            placeholder="Numer domu"
          />
<<<<<<< HEAD
          <div className="invalid-feedback absolute">{homenrErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Numer lokalu
          <input
            className={`form-control w-44 loginForm ${
=======
          <div className="invalid-feedback">{homenrErrors}</div>
        </label>
        <label className="text-primary m-3">
          Numer lokalu
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              flatnrErrors ? "is-invalid" : ""
            }`}
            value={flatnr}
            onChange={(e) => setFlatnr(e.target.value)}
            type="text"
            placeholder="Numer lokalu"
          />
<<<<<<< HEAD
          <div className="invalid-feedback absolute">{flatnrErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Kod pocztowy
          <input
            className={`form-control w-44 loginForm ${
=======
          <div className="invalid-feedback">{flatnrErrors}</div>
        </label>
        <label className="text-primary m-3">
          Kod pocztowy
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              postcodeErrors ? "is-invalid" : ""
            }`}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            type="text"
            placeholder="Kod pocztowy"
          />
<<<<<<< HEAD
          <div className="invalid-feedback absolute">{postcodeErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Miasto
          <input
            className={`form-control w-44 loginForm ${
=======
          <div className="invalid-feedback">{postcodeErrors}</div>
        </label>
        <label className="text-primary m-3">
          Miasto
          <input className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              cityErrors ? "is-invalid" : ""
            }`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
<<<<<<< HEAD
            placeholder="Miasto"
          />
          <div className="invalid-feedback absolute">{cityErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Wybierz kraj
          <select
            className={`form-control w-44 ${countryErrors ? "is-invalid" : ""}`}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" selected>
              -
            </option>
            <option value="Polska">Polska</option>
            <option value="Czehy">Czechy</option>
            <option value="Niemcy">Niemcy</option>
            <option value="Słowacja">Słowacja</option>
            <option value="Ukraina">Ukraina</option>
            <option value="Białoruś">Białoruś</option>
          </select>
          <div className="invalid-feedback absolute">{countryErrors}</div>
        </label>

        {responseError && (
          <p className="text-success text-center my-3">{responseError}</p>
        )}
        {responseSuccess && (
          <p className="text-success text-center my-3">{responseSuccess}</p>
        )}
        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white w-44 m-3 py-2 rounded disabled:opacity-50"
          type="submit"
          value="Zapisz dane do faktury"
          onClick={clickHandler}
=======
            placeholder="Miasto" />
            <div className="invalid-feedback">{cityErrors}</div>
        </label>
        <label className="text-primary m-3">
          <select
            className={`form-control loginForm ${
              countryErrors ? "is-invalid" : ""
            }`}
            value={country}
            onChange={(e) => setCountry(e.target.value)}>
            <option value="" selected>Wybierz Kraj </option>
            <option value="1">Polska</option>
            <option value="2">Czehy</option>
            <option value="3">Niemcy</option>
          </select>
          <div className="invalid-feedback">{countryErrors}</div>
        </label>

        {responseError && (
          <p className="text-danger text-center mt-3 mb-0">{responseError}</p>
        )}

        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          type="submit"
          value="Zapisz dane do faktury"
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
        />
      </form>
    </div>
  );
};

export default InvoiceData;
