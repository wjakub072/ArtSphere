import React, { useContext, useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { validatePostcode } from "../../../helpers/validation";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const DeliveryAddress = () => {
  useWebsiteTitle("Adres dostawy");
  const {
    responseError,
    setResponseError,
    responseSuccess,
    setResponseSuccess,
    deliveryAddressData,
    updateDeliveryAddressData,
    loadingButton,
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

  const [nameErrors, setNameErrors] = useState("");
  const [surnameErrors, setSurnameErrors] = useState("");
  const [phoneErrors, setPhoneErrors] = useState("");
  const [streetErrors, setStreetErrors] = useState("");
  const [homenrErrors, setHomenrErrors] = useState("");
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
    if (surname.length < 1) {
      setSurnameErrors("Pole nie może być puste");
    } else {
      setSurnameErrors("");
    }
  }, [surname]);

  useEffect(() => {
    if (phone.length < 1) {
      setPhoneErrors("Pole nie może być puste");
    } else {
      setPhoneErrors("");
    }
  }, [phone]);

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
    setSurnameErrors("");
    setPhoneErrors("");
    setStreetErrors("");
    setHomenrErrors("");
    setPostcodeErrors("");
    setCityErrors("");
    setCountryErrors("");
  }, []);

  useEffect(() => {
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
      postcode &&
      city &&
      country
    ) {
      setResponseError("");
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
    <div className="text-center mx-auto">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
        Adres dostawy
      </h2>
      <form className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="imie"
          >
            Imię
          </label>
          <div className="relative">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                nameErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="imie"
              name="imie"
              placeholder="Imię"
            />
            {nameErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{nameErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="nazwisko"
          >
            Nazwisko
          </label>
          <div className="relative">
            <input
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                surnameErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="nazwisko"
              name="nazwisko"
              placeholder="Nazwisko"
            />
            {surnameErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{surnameErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="numerTel"
          >
            Numer telefonu
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                phoneErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="numerTel"
              name="numerTel"
              placeholder="Numet telefonu"
            />
            {phoneErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{phoneErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="ulica"
          >
            Ulica
          </label>
          <div className="relative">
            <input
              onChange={(e) => setStreet(e.target.value)}
              value={street}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                streetErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="ulica"
              name="ulica"
              placeholder="Ulica"
            />
            {streetErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{streetErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="numerDomu"
          >
            Numer domu
          </label>
          <div className="relative">
            <input
              onChange={(e) => setHomenr(e.target.value)}
              value={homenr}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                homenrErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="numerDomu"
              name="numerDomu"
              placeholder="Numer domu"
            />
            {homenrErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{homenrErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="numerLokalu"
          >
            Numer lokalu
          </label>
          <div className="relative">
            <input
              onChange={(e) => setFlatnr(e.target.value)}
              value={flatnr}
              className="block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600"
              type="text"
              id="numerLokalu"
              name="numerLokalu"
              placeholder="Numer lokalu"
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="kodPocztowy"
          >
            Kod pocztowy
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPostcode(e.target.value)}
              value={postcode}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                postcodeErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="kodPocztowy"
              name="kodPocztowy"
              placeholder="Kod pocztowy"
            />
            {postcodeErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{postcodeErrors}</div>
        </div>

        <div className="mb-3">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="miasto"
          >
            Miasto
          </label>
          <div className="relative">
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                cityErrors ? "!border-red-500" : ""
              }`}
              type="text"
              id="miasto"
              name="miasto"
              placeholder="Miasto"
            />
            {cityErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{cityErrors}</div>
        </div>

        <div className="mb-3 sm:col-span-2 lg:col-span-1">
          <label
            className="text-indigo-600 px-2 pb-1 text-lg font-medium"
            htmlFor="miasto"
          >
            Wybierz kraj
          </label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                countryErrors ? "!border-red-500" : ""
              }`}
            >
              <option className="rounded-sm" value="" selected>
                -
              </option>
              <option value="Polska">Polska</option>
              <option value="Czehy">Czechy</option>
              <option value="Niemcy">Niemcy</option>
              <option value="Słowacja">Słowacja</option>
              <option value="Ukraina">Ukraina</option>
              <option value="Białoruś">Białoruś</option>
            </select>
            {countryErrors && (
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="text-red-500 h-2/5" />
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm ml-2 mt-1">{countryErrors}</div>
        </div>

        {responseError && (
          <p className="text-red-500 sm:col-span-2 lg:col-span-3 text-base text-center font-medium">
            {responseError}
          </p>
        )}
        {responseSuccess && (
          <p className="text-green-800 sm:col-span-2 lg:col-span-3 text-center font-medium">
            {responseSuccess}
          </p>
        )}
        {loadingButton ? (
          <button
            type="submit"
            className="w-full sm:col-span-2 lg:col-span-3 py-2 mb-4 font-medium text-white bg-indigo-600 rounded-sm shadow-sm opacity-70"
            disabled
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Zapisywanie...
          </button>
        ) : (
          <button
            className="w-full sm:col-span-2 lg:col-span-3 py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
            type="submit"
            onClick={clickHandler}
          >
            Zapisz dane adresowe
          </button>
        )}
      </form>
    </div>
  );
};
export default DeliveryAddress;
