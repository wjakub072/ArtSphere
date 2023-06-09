import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstace from "../api/axiosInstance";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userRole = localStorage.getItem("userRole");
    if (userRole) {
      return JSON.parse(userRole);
    }
    return null;
  });

  const [isCarts, setIsCarts] = useState(() => {
    let carts = localStorage.getItem("carts");
    if (carts) {
      return JSON.parse(carts);
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
  const [responseSuccess, setResponseSuccess] = useState("");
  const [sesionError, setSesionError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingButtonPass, setLoadingButtonPass] = useState(false);
  const [loadingButtonEmail, setLoadingButtonEmail] = useState(false);

  const navigate = useNavigate();
  const login = async (data) => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.post("auth/login", data, {
        withCredentials: true,
      });
      console.log("respons zalogowania");
      console.log(response);
      localStorage.setItem("userRole", JSON.stringify(response.data.role));
      setUser(response.data.role);
      setResponseError("");
      navigate("/profil/");
      await isCartsElements();
      await getDeliveryAddressData();
      await getInvoiceData();
    } catch (err) {
      setLoadingButton(false);
      console.log("error logowania");
      console.log(err);
      setResponseError(err.response.data.title);
    } finally {
      setLoadingButton(false);
    }
  };

  const logout = async () => {
    try {
      let response = await axiosInstace.post("auth/logout", {
        withCredentials: true,
      });
      console.log("respons wylogowania");
      console.log(response);
      localStorage.clear();
      setUser(null);
      setUserData(null);
      setDeliveryAddressData(null);
      setInvoiceData(null);
      navigate("/");
    } catch (err) {
      console.log("error wylogowania");
      console.log(err);
    }
  };

  const register = async (data, loginData) => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.post("auth/signup", data, {
        withCredentials: true,
      });
      console.log("respons rejestracji");
      console.log(response);
      await login(loginData);
    } catch (err) {
      setLoadingButton(false);
      console.log("error rejestracji");
      console.log(err);
      setResponseError(err.response.data.title);
    } finally {
      setLoadingButton(false);
    }
  };

  const changePassword = async (data) => {
    try {
      setLoadingButtonPass(true);
      let response = await axiosInstace.post("account/reset-password", data, {
        withCredentials: true,
      });
      console.log("respons zmiany hasła");
      console.log(response);
      setPassChangeSuccess("Hasło zostało zmienione");
      setPassChangeResponseError("");
    } catch (err) {
      setLoadingButtonPass(false);
      if (err.response) {
        setPassChangeSuccess("");
        setPassChangeResponseError(err.response.data.message);
      }
      errorResponseHandler(err);
    } finally {
      setLoadingButtonPass(false);
    }
  };

  const changeEmail = async (data) => {
    try {
      setLoadingButtonEmail(true);
      let response = await axiosInstace.post("account/change-email", data, {
        withCredentials: true,
      });
      console.log("respons zmiany emaila");
      console.log(response);
      setEmailChangeSuccess("Email został zmieniony");
      setEmailChangeResponseError("");
    } catch (err) {
      setLoadingButtonEmail(false);
      if (err.response) {
        setEmailChangeSuccess("");
        setEmailChangeResponseError(err.response.data.message);
      }
      errorResponseHandler(err);
    } finally {
      setLoadingButtonEmail(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.delete("account/delete", {
        withCredentials: true,
      });
      console.log("respons usuwania konta");
      console.log(response);
      localStorage.clear();
      setUser(null);
      setUserData(null);
      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      setLoadingButton(false);
      errorResponseHandler(err);
    } finally {
      setLoadingButton(false);
    }
  };

  const getDeliveryAddressData = async () => {
    try {
      let response = await axiosInstace.get("profile/address", {
        withCredentials: true,
      });
      console.log("respons danych adresu dostawy");
      console.log(response);
      localStorage.setItem(
        "deliveryAddressData",
        JSON.stringify(response.data)
      );
      setDeliveryAddressData(response.data);
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const updateDeliveryAddressData = async (data) => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.put("profile/address", data, {
        withCredentials: true,
      });
      console.log("respons update'u adresu dostawy");
      console.log(response);
      await getDeliveryAddressData();
      setResponseSuccess("Dane zostały zapisane");
    } catch (err) {
      setLoadingButton(false);
      if (err.response) {
        setResponseSuccess("");
        setResponseError(err.response.data.message);
      }
      errorResponseHandler(err);
    } finally {
      setLoadingButton(false);
    }
  };

  const getInvoiceData = async () => {
    try {
      let response = await axiosInstace.get("profile/company", {
        withCredentials: true,
      });
      console.log("respons danych do faktury");
      console.log(response);
      localStorage.setItem("invoiceData", JSON.stringify(response.data));
      setInvoiceData(response.data);
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const updateInvoiceData = async (data) => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.put("profile/company", data, {
        withCredentials: true,
      });
      console.log("respons update'u danych do faktury");
      console.log(response);
      await getInvoiceData();
      setResponseSuccess("Dane zostały zapisane");
    } catch (err) {
      setLoadingButton(false);
      if (err.response) {
        setResponseSuccess("");
        setResponseError(err.response.data.message);
      }
      errorResponseHandler(err);
    } finally {
      setLoadingButton(false);
    }
  };

  const isCartsElements = async () => {
    try {
      const isCartsElements = await axiosInstace.get("profile/cart/any", {
        withCredentials: true,
      });
      console.log(isCartsElements.data);
      localStorage.setItem(
        "carts",
        JSON.stringify(isCartsElements.data.anyCartElements)
      );
      setIsCarts(isCartsElements.data.anyCartElements);
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const errorResponseHandler = (err) => {
    console.log(err);
    if (!err.response) {
      setSesionError("Sesja wygasła zaloguj się ponownie");
      console.log("Błąd autoryzacji");
      console.log(sesionError);
      localStorage.clear();
      setUser(null);
      setUserData(null);
      setDeliveryAddressData(null);
      setInvoiceData(null);
      navigate("/logowanie");
    } else if (err.response && err.response.status === 401) {
      setSesionError("Sesja wygasła zaloguj się ponownie");
      console.log("Błąd autoryzacji");
      console.log(sesionError);
      localStorage.clear();
      setUser(null);
      setUserData(null);
      setDeliveryAddressData(null);
      setInvoiceData(null);
      navigate("/logowanie");
    } else if (err.response && err.response.status === 500) {
      console.log("Błąd serwera");
      console.log(err);
    } else {
      console.log("Wystąpił błąd");
      console.log(err);
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
          responseSuccess,
          sesionError,
          loadingButton,
          loadingButtonPass,
          loadingButtonEmail,
          userData,
          deliveryAddressData,
          invoiceData,
          isCarts,
          setResponseSuccess,
          setEmailChangeResponseError,
          setEmailChangeSuccess,
          setPassChangeResponseError,
          setPassChangeSuccess,
          setResponseError,
          setSesionError,
          login,
          logout,
          register,
          updateDeliveryAddressData,
          updateInvoiceData,
          changeEmail,
          changePassword,
          deleteAccount,
          isCartsElements,
          errorResponseHandler,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
