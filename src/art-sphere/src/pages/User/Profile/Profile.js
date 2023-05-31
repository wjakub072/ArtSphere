import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AddImage from "../../../components/Inputs/AddImage";
import Loading from "../../../components/Loading/Loading";
import axiosInstace from "../../../api/axiosInstance";

const Profile = () => {
  useWebsiteTitle("Profil");
  const {
    user,
    responseSuccess,
    setResponseSuccess,
    setSesionError,
    errorResponseHandler,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [firtsTryFirstName, setFirtsTryFirstName] = useState(true);
  const [firtsTryLastName, setFirtsTryLastName] = useState(true);
  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
  });

  useEffect(() => {
    if (!loading) {
      if (firtsTryFirstName) {
        setFirtsTryFirstName(false);
      } else {
        if (data.firstName.length < 1) {
          setErrors({ ...errors, firstNameError: "Pole nie może być puste" });
        } else {
          setErrors({ ...errors, firstNameError: "" });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.firstName]);

  useEffect(() => {
    if (!loading) {
      if (firtsTryLastName) {
        setFirtsTryLastName(false);
      } else {
        if (data.lastName.length < 1) {
          setErrors({ ...errors, lastNameError: "Pole nie może być puste" });
        } else {
          setErrors({ ...errors, lastNameError: "" });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.lastName]);

  useEffect(() => {
    navigate("/profil/");
    setErrors({ firstNameError: "", lastNameError: "" });
    setSesionError("");
    getProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setResponseSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfileData = async () => {
    try {
      let response = await axiosInstace.get("profile", {
        withCredentials: true,
      });
      console.log("respons danych profilu");
      console.log(response);
      await setData({
        ...response.data,
        Picture: response.data.profilePicture,
      });
      setLoading(false);
    } catch (err) {
      errorResponseHandler(err);
    } finally {
    }
  };

  const updateProfileData = async (data) => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.put("profile", data, {
        withCredentials: true,
      });
      console.log("respons update'u profilu");
      console.log(response);
      setResponseSuccess("Dane zostały zaktualizowane");
    } catch (err) {
      setLoadingButton(false);
      errorResponseHandler(err);
    } finally {
      setLoadingButton(false);
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();

    if (data.firstName && data.lastName) {
      updateProfileData(data);
    } else {
      setResponseSuccess("");
      setErrors({
        ...errors,
        firstNameError: !data.firstName ? "Pole nie może być puste" : "",
        lastNameError: !data.lastName ? "Pole nie może być puste" : "",
      });
    }
  };

  return loading ? (
    <div className="mt-24 w-48 h-48 mx-auto">
      <Loading />
    </div>
  ) : (
    <>
      <div className="text-center mx-auto">
        <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
          Profil
        </h2>
        {(user === "artysta" || user === "administrator") && (
          <AddImage
            value={data.Picture}
            onChange={(val) => setData({ ...data, Picture: val })}
          />
        )}

        <form className="w-full mt-3">
          <div className="mb-3">
            <label
              className="text-indigo-600 px-2 pb-1 text-lg font-medium"
              htmlFor="imie"
            >
              Imię
            </label>
            <div className="relative">
              <input
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                value={data.firstName}
                className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                  errors.firstNameError ? "!border-red-500" : ""
                }`}
                type="text"
                id="imie"
                name="imie"
                placeholder="Imię"
              />
              {errors.firstNameError && (
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="text-red-500 h-2/5" />
                </div>
              )}
            </div>
            <div className="text-red-500 text-sm ml-2 mt-1">
              {errors.firstNameError}
            </div>
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
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                value={data.lastName}
                className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                  errors.lastNameError ? "!border-red-500" : ""
                }`}
                type="text"
                id="nazwisko"
                name="nazwisko"
                placeholder="Nazwisko"
              />
              {errors.lastNameError && (
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                  <ExclamationCircleIcon className="text-red-500 h-2/5" />
                </div>
              )}
            </div>
            <div className="text-red-500 text-sm ml-2 mt-1">
              {errors.lastNameError}
            </div>
          </div>

          {(user === "artysta" || user === "administrator") && (
            <div className="mb-3">
              <label
                className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                htmlFor="nazwisko"
              >
                Krótki opis
              </label>
              <div>
                <textarea
                  className="block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600"
                  placeholder="Krótki opis"
                  rows="7"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          )}

          {responseSuccess && (
            <p className="text-green-800 text-center my-3 font-medium">
              {responseSuccess}
            </p>
          )}

          {loadingButton ? (
            <button
              type="submit"
              className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm opacity-70"
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
              Aktualizowanie...
            </button>
          ) : (
            <button
              className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
              type="submit"
              onClick={clickHandler}
            >
              Zaktualizuj profil
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Profile;
