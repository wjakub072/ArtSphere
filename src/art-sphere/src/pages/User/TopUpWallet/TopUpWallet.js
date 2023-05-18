import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import Loading from "../../../components/Loading/Loading";

const TopUpWallet = () => {
  useWebsiteTitle("Portfel");

  const [actualFunds, setActualFunds] = useState(2133123123);
  const [depositFunds, setDepositFunds] = useState(0);
  const [withdrawFunds, setWithdrawFunds] = useState(0);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadinDepositBtn, setLoadinDepositBtn] = useState(false);
  const [loadinWithdrawBtn, setLoadinWithdrawBtn] = useState(false);
  const [depositFundsResponsError, setDepositFundsResponsError] = useState("");
  const [withdrawFundsResponsError, setWithdrawFundsResponsError] =
    useState("");
  const [depositFundsResponsSuccess, setDepositFundsResponsSuccess] =
    useState("");
  const [withdrawFundsResponsSuccess, setWithdrawFundsResponsSuccess] =
    useState("");

  const [depositFundsErrors, setDepositFundsErrors] = useState("");
  const [withdrawFundsErrors, setWithdrawFundsErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");

  useEffect(() => {
    if (!depositFunds) {
      setDepositFundsErrors("Pole nie może być puste");
    } else if (depositFunds < 0) {
      setDepositFundsErrors("Kwota nie może być ujemna");
    } else {
      setDepositFundsErrors("");
    }
  }, [depositFunds]);

  useEffect(() => {
    if (!withdrawFunds) {
      setWithdrawFundsErrors("Pole nie może być puste");
    } else if (withdrawFunds < 0) {
      setWithdrawFundsErrors("Kwota nie może być ujemna");
    } else if (withdrawFunds > actualFunds) {
      setWithdrawFundsErrors("Nie masz tyle środków na koncie");
    } else {
      setWithdrawFundsErrors("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawFunds]);

  useEffect(() => {
    if (!password) {
      setPasswordErrors("Pole nie może być puste");
    } else {
      setPasswordErrors("");
    }
  }, [password]);

  useEffect(() => {
    setPasswordErrors("");
    setDepositFundsErrors("");
    setWithdrawFundsErrors("");
  }, []);

  useEffect(() => {
    return () => {
      setDepositFundsResponsError("");
      setWithdrawFundsResponsError("");
      setDepositFundsResponsSuccess("");
      setWithdrawFundsResponsSuccess("");
    };
  }, []);

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleDepositFunds = (e) => {
    const newVal = parseInt(e.target.value);
    if (newVal >= 0) {
      setDepositFunds(newVal);
    } else {
      setDepositFunds(0);
    }
  };

  const handleWithdrawFunds = (e) => {
    const newVal = parseInt(e.target.value);
    if (newVal >= 0) {
      setWithdrawFunds(newVal);
    } else {
      setWithdrawFunds(0);
    }
  };

  const depositFundsHandler = async (e) => {
    e.preventDefault();
    if (depositFunds > 0 && depositFunds) {
      setDepositFundsErrors("");
      await console.log("depositFunds OK");
    } else {
      if (!depositFunds) {
        setDepositFundsErrors("Pole nie może być puste");
      }
      if (depositFunds < 0) {
        setDepositFundsErrors("Kwota nie może być ujemna");
      }
    }
  };

  const withdrawFundsHandler = async (e) => {
    e.preventDefault();
    if (
      withdrawFunds > 0 &&
      withdrawFunds &&
      password &&
      withdrawFunds < actualFunds
    ) {
      setWithdrawFundsErrors("");
      setPasswordErrors("");
      await console.log("withdrawFunds OK");
    } else {
      if (!withdrawFunds) {
        setWithdrawFundsErrors("Pole nie może być puste");
      }
      if (withdrawFunds < 0) {
        setWithdrawFundsErrors("Kwota nie może być ujemna");
      }
      if (withdrawFunds > actualFunds) {
        setWithdrawFundsErrors("Nie masz tyle środków na koncie");
      }
      if (!password) {
        setPasswordErrors("Pole nie może być puste");
      }
    }
  };

  return (
    <div className="text-center mx-auto">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
        Portfel
      </h2>
      {loading ? (
        <div className="mt-16 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : (
        <>
          <div>
            <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
              Aktualny stan środków:{" "}
              <span className="text-black">{actualFunds}</span> PLN
            </h3>
          </div>
          <div className="text-center mx-auto">
            <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
              Doładuj środki
            </h3>
            <form>
              <div className="mb-3">
                <div className="relative">
                  <input
                    onChange={handleDepositFunds}
                    onFocus={handleFocus}
                    value={depositFunds}
                    className={`block appearance-none w-full py-3 pl-3 pr-8 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      depositFundsErrors ? "!border-red-500" : ""
                    }`}
                    type="number"
                    placeholder="0.00"
                  />
                  {depositFundsErrors && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {depositFundsErrors}
                </div>
              </div>

              {depositFundsResponsError && (
                <p className="text-red-500 text-center my-3 font-medium">
                  {depositFundsResponsError}
                </p>
              )}
              {depositFundsResponsSuccess && (
                <p className="text-green-800 text-center my-3 font-medium">
                  {depositFundsResponsSuccess}
                </p>
              )}
              {loadinDepositBtn ? (
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
                  Doładowywanie...
                </button>
              ) : (
                <button
                  className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                  type="submit"
                  onClick={depositFundsHandler}
                >
                  Doładuj środki
                </button>
              )}
            </form>
          </div>

          <div className="text-center mx-auto">
            <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
              Wypłać środki
            </h3>
            <form>
              <div className="mb-3">
                <div className="relative">
                  <input
                    onChange={handleWithdrawFunds}
                    onFocus={handleFocus}
                    value={withdrawFunds}
                    className={`block appearance-none w-full py-3 pl-3 pr-8 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      withdrawFundsErrors ? "!border-red-500" : ""
                    }`}
                    type="number"
                    placeholder="0.00"
                  />
                  {withdrawFundsErrors && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {withdrawFundsErrors}
                </div>
              </div>

              <div className="mb-3">
                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      passwordErrors ? "!border-red-500" : ""
                    }`}
                    type="password"
                    placeholder="Hasło"
                  />
                  {passwordErrors && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {passwordErrors}
                </div>
              </div>

              {withdrawFundsResponsError && (
                <p className="text-red-500 text-center my-3 font-medium">
                  {withdrawFundsResponsError}
                </p>
              )}
              {withdrawFundsResponsSuccess && (
                <p className="text-green-800 text-center my-3 font-medium">
                  {withdrawFundsResponsSuccess}
                </p>
              )}
              {loadinWithdrawBtn ? (
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
                  Wypłacanie...
                </button>
              ) : (
                <button
                  className="w-full py-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                  type="submit"
                  onClick={withdrawFundsHandler}
                >
                  Wypłać środki
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TopUpWallet;
