import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import "./Profile.css";

const Profile = () => {
  useWebsiteTitle("Profil");
  const {
    userData,
    updateProfileData,
    responseSuccess,
    setResponseSuccess,
    setSesionError,
  } = useContext(AuthContext);

  const [data, setData] = useState(userData);
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
  });

  useEffect(() => {
    if (data.firstName.length < 1) {
      setErrors({ ...errors, firstNameError: "Pole nie może być puste" });
    } else {
      setErrors({ ...errors, firstNameError: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.firstName]);

  useEffect(() => {
    if (data.lastName.length < 1) {
      setErrors({ ...errors, lastNameError: "Pole nie może być puste" });
    } else {
      setErrors({ ...errors, lastNameError: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.lastName]);

  useEffect(() => {
    setErrors({ firstNameError: "", lastNameError: "" });
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setResponseSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();

    if (data.firstName && data.lastName) {
      updateProfileData(data);
    } else {
      setErrors({
        ...errors,
        firstNameError: !data.firstName ? "Pole nie może być puste" : "",
        lastNameError: !data.lastName ? "Pole nie może być puste" : "",
      });
    }
  };

  return (
    <div className="user-profile-wrap">
      <h2 className="mb-3">Profil</h2>
      {/* <p>Jeszcze będzie gdzieś zdjęcie</p> */}

      <form className="user-profile-form">
        <label className="text-primary">
          Imię
          <input
            className={`form-control ${
              errors.firstNameError ? "is-invalid" : ""
            }`}
            type="text"
            placeholder="Imię"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <div className="invalid-feedback">{errors.firstNameError}</div>
        </label>
        <label className="text-primary">
          Nazwisko
          <input
            className={`form-control ${
              errors.lastNameError ? "is-invalid" : ""
            }`}
            type="text"
            placeholder="Nazwisko"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
          <div className="invalid-feedback">{errors.lastNameError}</div>
        </label>
        <label className="text-primary">
          Krótki opis
          <textarea
            className="form-control"
            placeholder="Krótki opis"
            rows="5"
            cols="30"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></textarea>
        </label>
        {responseSuccess && (
          <p className="text-success text-center my-3">{responseSuccess}</p>
        )}
        <input
          className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
          type="submit"
          value="Zaktualizuj profil"
          onClick={clickHandler}
        />
      </form>
    </div>
  );
};

export default Profile;
