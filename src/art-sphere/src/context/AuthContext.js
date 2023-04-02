import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const [responseError, setResponseError] = useState("");

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
      localStorage.setItem("userProfile", JSON.stringify(response.data));
      setUser(response.data);
      setResponseError("");
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
      localStorage.removeItem("userProfile");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log("error wylogowania");
      console.log(err);
    }
  };

  const register = async (data, logiData) => {
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
      await login(logiData);
    } catch (err) {
      console.log("error rejestracji");
      console.log(err);
      setResponseError(err.response.data.title);
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
      localStorage.removeItem("userProfile");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log("respons erroru usuwania konta");
      console.log(err);
    }
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          responseError,
          setResponseError,
          login,
          logout,
          register,
          deleteAccount,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
