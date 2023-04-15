import { useState, useEffect } from "react";
import { validatePostcode } from "../../../helpers/validation";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./InvoiceData.css";

const InvoiceData = () => {
  useWebsiteTitle("Dane do faktury");

  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [street, setStreet] = useState("");
  const [homenr, setHomenr] = useState("");
  const [flatnr, setFlatnr] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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
      setNameErrors("Pole nie może być puste");
    } else {
      setNameErrors("");
    }
  }, [name]);

  useEffect(() => {
    if (nip.length < 1) {
      setNipErrors("Pole nie może być puste");
    } else {
      setNipErrors("");
    }
  }, [nip]);

  useEffect(() => {
    if (street.length < 1) {
      setStreetErrors("Pole nie może być puste");
    } else {
      setStreetErrors("");
    }
  }, [street]);

  useEffect(() => {
    if (homenr.length < 1) {
      setHomenrErrors("Pole nie może być puste");
    } else {
      setHomenrErrors("");
    }
  }, [homenr]);

  useEffect(() => {
    if (flatnr.length < 1) {
      setFlatnrErrors("Pole nie może być puste");
    } else {
      setFlatnrErrors("");
    }
  }, [flatnr]);

  useEffect(() => {
    if (postcode.length < 1) {
      setPostcodeErrors("Pole nie może być puste");
    } else if (validatePostcode(postcode)) {
      setPostcodeErrors("");
    } else {
      setPostcodeErrors("Niepoprawny kod pocztowy");
    }
  }, [postcode]);

  useEffect(() => {
    if (city.length < 1) {
      setCityErrors("Pole nie może być puste");
    } else {
      setCityErrors("");
    }
  }, [city]);

  useEffect(() => {
    if (country === "") {
      setCountryErrors("Niepoprawny kraj");
    } else {
      setCountryErrors("");
    }
  }, [country]);

  useEffect(() => {
    setNameErrors("");
    setNipErrors("");
    setStreetErrors("");
    setHomenrErrors("");
    setFlatnrErrors("");
    setPostcodeErrors("");
    setCityErrors("");
    setCountryErrors("");
  }, []);

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
      console.log("Wszystko ok");
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

  return (
    <div className="user-invoice-data-wrap">
      <h2>Dane do faktury</h2>
      <form className="invoice-data-form">
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
              nipErrors ? "is-invalid" : ""
            }`}
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            type="text"
            placeholder="NIP"
          />
          <div className="invalid-feedback absolute">{nipErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Ulica
          <input
            className={`form-control w-44 loginForm ${
              streetErrors ? "is-invalid" : ""
            }`}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            placeholder="Ulica"
          />
          <div className="invalid-feedback absolute">{streetErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Numer domu
          <input
            className={`form-control w-44 loginForm ${
              homenrErrors ? "is-invalid" : ""
            }`}
            value={homenr}
            onChange={(e) => setHomenr(e.target.value)}
            type="text"
            placeholder="Numer domu"
          />
          <div className="invalid-feedback absolute">{homenrErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Numer lokalu
          <input
            className={`form-control w-44 loginForm ${
              flatnrErrors ? "is-invalid" : ""
            }`}
            value={flatnr}
            onChange={(e) => setFlatnr(e.target.value)}
            type="text"
            placeholder="Numer lokalu"
          />
          <div className="invalid-feedback absolute">{flatnrErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Kod pocztowy
          <input
            className={`form-control w-44 loginForm ${
              postcodeErrors ? "is-invalid" : ""
            }`}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            type="text"
            placeholder="Kod pocztowy"
          />
          <div className="invalid-feedback absolute">{postcodeErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Miasto
          <input
            className={`form-control w-44 loginForm ${
              cityErrors ? "is-invalid" : ""
            }`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
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
            <option value="1">Polska</option>
            <option value="2">Czehy</option>
            <option value="3">Niemcy</option>
          </select>
          <div className="invalid-feedback absolute">{countryErrors}</div>
        </label>

        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white w-44 m-3 py-2 rounded disabled:opacity-50"
          type="submit"
          value="Zapisz dane do faktury"
          onClick={clickHandler}
        />
      </form>
    </div>
  );
};

export default InvoiceData;
