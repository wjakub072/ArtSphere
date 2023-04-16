import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userRole = localStorage.getItem("userRole");
    if (userRole) {
      return JSON.parse(userRole);
    }
    return null;
  });

  const [userData, setUserData] = useState(() => {
    let userData = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(userData);
    }
    return {};
  });

  const [deliveryAddressData, setDeliveryAddressData] = useState(() => {
    let deliveryAddressData = localStorage.getItem("deliveryAddressData");
    if (deliveryAddressData) {
      return JSON.parse(deliveryAddressData);
    }
    return {};
  });

  const [invoiceData, setInvoiceData] = useState(() => {
    let invoiceData = localStorage.getItem("invoiceData");
    if (invoiceData) {
      return JSON.parse(invoiceData);
    }
    return {};
  });

  const [responseError, setResponseError] = useState("");
  const [passChangeResponseError, setPassChangeResponseError] = useState("");
  const [passChangeSuccess, setPassChangeSuccess] = useState("");
  const [emailChangeSuccess, setEmailChangeSuccess] = useState("");
  const [emailChangeResponseError, setEmailChangeResponseError] = useState("");
  const [sesionError, setSesionError] = useState("");

  const navigate = useNavigate();
  const login = async (data) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5006/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons zalogowania");
      console.log(response);
      localStorage.setItem("userRole", JSON.stringify(response.data.role));
      setUser(response.data.role);
      setResponseError("");
      await getProfileData();
      await getDeliveryAddressData();
      await getInvoiceData();
      navigate("/profil");
    } catch (err) {
      console.log("error logowania");
      console.log(err);
      setResponseError(err.response.data.title);
    }
  };

  const logout = async () => {
    try {
      let response = await axios.post("http://127.0.0.1:5006/api/auth/logout", {
        withCredentials: true,
      });
      console.log("respons wylogowania");
      console.log(response);
      localStorage.clear();
      setUser(null);
      setUserData(null);
      navigate("/");
    } catch (err) {
      console.log("error wylogowania");
      console.log(err);
    }
  };

  const register = async (data, loginData) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5006/api/auth/signup",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons rejestracji");
      console.log(response);
      await login(loginData);
    } catch (err) {
      console.log("error rejestracji");
      console.log(err);
      setResponseError(err.response.data.title);
    }
  };

  const getProfileData = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:5006/api/profile", {
        withCredentials: true,
      });
      console.log("respons danych profilu");
      console.log(response);
      localStorage.setItem("userData", JSON.stringify(response.data));
      setUserData(response.data);
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const updateProfileData = async (data) => {
    try {
      let response = await axios.put(
        "http://127.0.0.1:5006/api/profile",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons update'u profilu");
      console.log(response);
      await getProfileData();
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const changePassword = async (data) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5006/api/account/reset-password",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons zmiany hasła");
      console.log(response);
      setPassChangeSuccess("Hasło zostało zmienione");
      setPassChangeResponseError("");
    } catch (err) {
      if (err.response) {
        setPassChangeSuccess("");
        setPassChangeResponseError(err.response.data.message);
      }
      errorResponseHandler(err);
    }
  };

  const changeEmail = async (data) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5006/api/account/reset-password",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons zmiany emaila");
      console.log(response);
      setEmailChangeSuccess("Email został zmieniony");
      setEmailChangeResponseError("");
    } catch (err) {
      if (err.response) {
        setEmailChangeSuccess("");
        setEmailChangeResponseError(err.response.data.message);
      }
      errorResponseHandler(err);
    }
  };

  const deleteAccount = async () => {
    try {
      let response = await axios.delete(
        "http://127.0.0.1:5006/api/account/delete",
        {
          withCredentials: true,
        }
      );
      console.log("respons usuwania konta");
      console.log(response);
      localStorage.clear();
      setUser(null);
      setUserData(null);
      navigate("/");
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const errorResponseHandler = (err) => {
    console.log(err);
    if (!err.response) {
      setSesionError("Sesja wygasła zaloguj się ponownie");
      console.log("Błąd autoryzacji");
      localStorage.clear();
      setUser(null);
      setUserData(null);
      navigate("/logowanie");
    } else if (err.response && err.response.status === 401) {
      setSesionError("Sesja wygasła zaloguj się ponownie");
      console.log("Błąd autoryzacji");
      localStorage.clear();
      setUser(null);
      setUserData(null);
      navigate("/logowanie");
    } else if (err.response && err.response.status === 500) {
      console.log("Błąd serwera");
      console.log(err);
    } else {
      console.log("Wystąpił błąd");
      console.log(err);
    }
  };

  const getDeliveryAddressData = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:5006/api/profile/address", {
        withCredentials: true,
      });
      console.log("respons danych adresu dostawy");
      console.log(response);
      localStorage.setItem("deliveryAddressData", JSON.stringify(response.data));
      setDeliveryAddressData(response.data);
      //setResponseSuccess("Dane zostały zaaktualizowane");
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const updateDeliveryAddressData = async (data) => {
    try {
      let response = await axios.put(
        "http://127.0.0.1:5006/api/profile/address",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons update'u adresu dostawy");
      console.log(response);
      await getDeliveryAddressData();
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const getInvoiceData = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:5006/api/profile/company", {
        withCredentials: true,
      });
      console.log("respons danych do faktury");
      console.log(response);
      localStorage.setItem("invoiceData", JSON.stringify(response.data));
      setUserData(response.data);
      //setResponseSuccess("Dane zostały zaaktualizowane");
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const updateInvoiceData = async (data) => {
    try {
      let response = await axios.put(
        "http://127.0.0.1:5006/api/profile/company",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons update'u danych do faktury");
      console.log(response);
      await getInvoiceData();
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          responseError,
          emailChangeResponseError,
          emailChangeSuccess,
          passChangeResponseError,
          passChangeSuccess,
          sesionError,
          userData,
          deliveryAddressData,
          invoiceData,
          setEmailChangeResponseError,
          setEmailChangeSuccess,
          setPassChangeResponseError,
          setPassChangeSuccess,
          setResponseError,
          setSesionError,
          login,
          logout,
          register,
          updateProfileData,
          changeEmail,
          changePassword,
          deleteAccount,
          updateDeliveryAddressData,
          updateInvoiceData,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
