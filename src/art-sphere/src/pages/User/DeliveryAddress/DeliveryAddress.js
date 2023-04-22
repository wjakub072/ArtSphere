import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
<<<<<<< HEAD
import { validatePostcode } from "../../../helpers/validation";
import "./DeliveryAddress.css";

const DeliveryAddress = () => {
  useWebsiteTitle("Adres dostawy");
  const {
    responseError,
    setResponseError,
    responseSuccess,
    setResponseSuccess,
    deliveryAddressData,
    updateDeliveryAddressData,
  } = useContext(AuthContext);

  const [name, setName] = useState(
    deliveryAddressData.firstName ? deliveryAddressData.firstName : ""
  );
  const [surname, setSurname] = useState(
    deliveryAddressData.lastName ? deliveryAddressData.lastName : ""
  );
  const [phone, setPhone] = useState(
    deliveryAddressData.phoneNumber ? deliveryAddressData.phoneNumber : ""
  );
  const [street, setStreet] = useState(
    deliveryAddressData.addressStreet ? deliveryAddressData.addressStreet : ""
  );
  const [homenr, setHomenr] = useState(
    deliveryAddressData.addressBuilding
      ? deliveryAddressData.addressBuilding
      : ""
  );
  const [flatnr, setFlatnr] = useState(
    deliveryAddressData.addressApartment
      ? deliveryAddressData.addressApartment
      : ""
  );
  const [postcode, setPostcode] = useState(
    deliveryAddressData.addressPostalCode
      ? deliveryAddressData.addressPostalCode
      : ""
  );
  const [city, setCity] = useState(
    deliveryAddressData.addressCity ? deliveryAddressData.addressCity : ""
  );
  const [country, setCountry] = useState(
    deliveryAddressData.addressCountry ? deliveryAddressData.addressCountry : ""
  );
=======
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
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

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
    if (surname.length < 1) {
<<<<<<< HEAD
      setSurnameErrors("Pole nie może być puste");
    } else {
      setSurnameErrors("");
=======
      setSurnameErrors("Nazwisko - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [surname]);

  useEffect(() => {
    if (phone.length < 1) {
<<<<<<< HEAD
      setPhoneErrors("Pole nie może być puste");
    } else {
      setPhoneErrors("");
=======
      setPhoneErrors("Numer telefonu - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    }
  }, [phone]);

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
<<<<<<< HEAD
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
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
<<<<<<< HEAD
    if (country === "") {
      setCountryErrors("Niepoprawny kraj");
    } else {
      setCountryErrors("");
=======
    if (country.length < 1) {
      setCountryErrors("Kraj - Pole nie może być puste");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
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
<<<<<<< HEAD
    return () => {
      setResponseError("");
      setResponseSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      surname &&
      phone &&
      street &&
      homenr &&
      flatnr &&
      postcode &&
      city &&
      country
    ) {
      updateDeliveryAddressData({
        firstName: name,
        lastName: surname,
        phoneNumber: phone,
        addressStreet: street,
        addressBuilding: homenr,
        addressApartment: flatnr,
        addressPostalCode: postcode,
        addressCity: city,
        addressCountry: country,
      });
    } else {
      if (!name) {
        setNameErrors("Pole nie może być puste");
      }
      if (!surname) {
        setSurnameErrors("Pole nie może być puste");
      }
      if (!phone) {
        setPhoneErrors("Pole nie może być puste");
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
    return () => setResponseError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
  return (
    <div className="user-delivery-address-wrap">
      <h2>Adres dostawy</h2>
      <form className="delivery-address-form">
<<<<<<< HEAD
        <label className="text-primary m-3 relative">
          Imię
          <input
            className={`form-control w-44 loginForm ${
=======
        <label className="text-primary m-3">
          Imię
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              nameErrors ? "is-invalid" : ""
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Imię"
<<<<<<< HEAD
          />
          <div className="invalid-feedback absolute">{nameErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Nazwisko
          <input
            className={`form-control w-44 loginForm ${
=======
            />
            <div className="invalid-feedback">{nameErrors}</div>
        </label>
        <label className="text-primary m-3">
          Nazwisko
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              surnameErrors ? "is-invalid" : ""
            }`}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder="Nazwisko"
<<<<<<< HEAD
          />
          <div className="invalid-feedback absolute">{surnameErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Numer telefonu
          <input
            className={`form-control w-44 loginForm ${
=======
            />
            <div className="invalid-feedback">{surnameErrors}</div>
        </label>
        <label className="text-primary m-3">
          Numer telefonu
          <input
            className={`form-control loginForm ${
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
              phoneErrors ? "is-invalid" : ""
            }`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Numer telefonu"
          />
<<<<<<< HEAD
          <div className="invalid-feedback absolute">{phoneErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Ulica
          <input
            className={`form-control w-44 loginForm ${
=======
          <div className="invalid-feedback">{phoneErrors}</div>
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
            placeholder="Ulica"
<<<<<<< HEAD
          />
          <div className="invalid-feedback absolute">{streetErrors}</div>
        </label>

        <label className="text-primary m-3 relative">
          Numer domu
          <input
            className={`form-control w-44 loginForm ${
=======
            />
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
          <input
            className={`form-control loginForm ${
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
          value="Zapisz dane adresowe"
          onClick={clickHandler}
=======
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
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
        />
      </form>
    </div>
  );
};
export default DeliveryAddress;
