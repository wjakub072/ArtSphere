import { useContext, useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import Loading from "../../../components/Loading/Loading";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import { validatePostcode } from "../../../helpers/validation";
import axiosInstace from "../../../api/axiosInstance";

function Payment() {
  useWebsiteTitle("Płatność i Dostawa");
  const {
    responseError,
    setResponseError,
    responseSuccess,
    setResponseSuccess,
    deliveryAddressData,
    updateDeliveryAddressData,
    invoiceData,
    updateInvoiceData,
    loadingButton,
    errorResponseHandler,
    isCarts,
    isCartsElements,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState({
    firstName: deliveryAddressData.firstName,
    lastName: deliveryAddressData.lastName,
    phone: deliveryAddressData.phoneNumber,
    street: deliveryAddressData.addressStreet,
    building: deliveryAddressData.addressBuilding,
    apartment: deliveryAddressData.addressApartment,
    postalCode: deliveryAddressData.addressPostalCode,
    city: deliveryAddressData.addressCity,
    country: deliveryAddressData.addressCountry,
  });
  const [deliveryAddressErrors, setDeliveryAddressErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    building: "",
    apartment: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [deliveryForm, setDeliveryForm] = useState(false);
  const [deliveryTabIndex, setDeliveryTabIndex] = useState(-1);
  const [invoice, setInvoice] = useState({
    companyName: invoiceData.companyName,
    companyNip: invoiceData.companyVatId,
    street: invoiceData.companyAddressStreet,
    building: invoiceData.companyAddressBuilding,
    apartment: invoiceData.companyAddressApartment,
    postalCode: invoiceData.companyAddressPostalCode,
    city: invoiceData.companyAddressCity,
    country: invoiceData.companyAddressCountry,
  });
  const [invoiceErrors, setInvoiceErrors] = useState({
    companyName: "",
    companyNip: "",
    street: "",
    building: "",
    apartment: "",
    postalCode: "",
    city: "",
    country: "",
  });
  const [invoiceForm, setInvoiceForm] = useState(false);
  const [invoiceTabIndex, setInvoiceTabIndex] = useState(-1);
  const [wallet, setWallet] = useState({
    actualFunds: 0,
    depositFunds: 0,
  });
  const [walletErrors, setWalletErrors] = useState({
    depositFunds: "",
  });
  const [walletForm, setWalletForm] = useState(false);
  const [walletTabIndex, setWalletTabIndex] = useState(-1);
  const [loadingDepositBtn, setLoadingDepositBtn] = useState(false);
  const [check, setCheck] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);
  const [loadingExecuteBtn, setLoadingExecuteBtn] = useState(false);
  const [executeSuccess, setExecuteSuccess] = useState("");
  const [executeError, setExecuteError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("wallet");

  useEffect(() => {
    if (!deliveryAddress.firstName) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        firstName: "Pole nie może być puste",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, firstName: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.firstName]);

  useEffect(() => {
    if (!deliveryAddress.lastName) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        lastName: "Pole nie może być puste",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, lastName: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.lastName]);

  useEffect(() => {
    if (!deliveryAddress.phone) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        phone: "Pole nie może być puste",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, phone: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.phone]);

  useEffect(() => {
    if (!deliveryAddress.street) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        street: "Pole nie może być puste",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, street: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.street]);

  useEffect(() => {
    if (!deliveryAddress.building) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        building: "Pole nie może być puste",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, building: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.building]);

  useEffect(() => {
    if (!deliveryAddress.postalCode) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        postalCode: "Pole nie może być puste",
      });
    } else if (validatePostcode(deliveryAddress.postalCode)) {
      setDeliveryAddressErrors("");
    } else {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        postalCode: "Niepoprawny kod pocztowy",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.postalCode]);

  useEffect(() => {
    if (!deliveryAddress.city) {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        city: "Pole nie może być puste",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, city: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.city]);

  useEffect(() => {
    if (deliveryAddress.country === "-") {
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        country: "Kraj nie został wybrany",
      });
    } else {
      setDeliveryAddressErrors({ ...deliveryAddressErrors, country: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryAddress.country]);

  useEffect(() => {
    if (!invoice.companyName) {
      setInvoiceErrors({
        ...invoiceErrors,
        companyName: "Pole nie może być puste",
      });
    } else {
      setInvoiceErrors({ ...invoiceErrors, companyName: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.companyName]);

  useEffect(() => {
    if (!invoice.companyNip) {
      setInvoiceErrors({
        ...invoiceErrors,
        companyNip: "Pole nie może być puste",
      });
    } else {
      setInvoiceErrors({ ...invoiceErrors, companyNip: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.companyNip]);

  useEffect(() => {
    if (!invoice.street) {
      setInvoiceErrors({ ...invoiceErrors, street: "Pole nie może być puste" });
    } else {
      setInvoiceErrors({ ...invoiceErrors, street: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.street]);

  useEffect(() => {
    if (!invoice.building) {
      setInvoiceErrors({
        ...invoiceErrors,
        building: "Pole nie może być puste",
      });
    } else {
      setInvoiceErrors({ ...invoiceErrors, building: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.building]);

  useEffect(() => {
    if (!invoice.postalCode) {
      setInvoiceErrors({
        ...invoiceErrors,
        postalCode: "Pole nie może być puste",
      });
    } else if (validatePostcode(invoice.postalCode)) {
      setInvoiceErrors({ ...invoiceErrors, postalCode: "" });
    } else {
      setInvoiceErrors({
        ...invoiceErrors,
        postalCode: "Niepoprawny kod pocztowy",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.postalCode]);

  useEffect(() => {
    if (!invoice.city) {
      setInvoiceErrors({ ...invoiceErrors, city: "Pole nie może być puste" });
    } else {
      setInvoiceErrors({ ...invoiceErrors, city: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.city]);

  useEffect(() => {
    if (invoice.country === "-") {
      setInvoiceErrors({
        ...invoiceErrors,
        country: "Kraj nie został wybrany",
      });
    } else {
      setInvoiceErrors({ ...invoiceErrors, country: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice.country]);

  useEffect(() => {
    if (!wallet.depositFunds) {
      setWalletErrors({
        ...walletErrors,
        depositFunds: "Pole nie może być puste",
      });
    } else if (wallet.depositFunds < 0) {
      setWalletErrors({
        ...walletErrors,
        depositFunds: "Kwota nie może być ujemna",
      });
    } else {
      setWalletErrors({ ...walletErrors, depositFunds: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.depositFunds]);

  useEffect(() => {
    if (!isCarts) {
      navigate("/profil");
    }
    getInfo();
    setDeliveryAddressErrors({
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      building: "",
      apartment: "",
      postalCode: "",
      city: "",
      country: "",
    });
    setInvoiceErrors({
      companyName: "",
      companyNip: "",
      street: "",
      building: "",
      apartment: "",
      postalCode: "",
      city: "",
      country: "",
    });
    setWalletErrors({
      depositFunds: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setResponseError("");
      setResponseSuccess("");
      setExecuteError("");
      setExecuteSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfo = async () => {
    try {
      const getOffersSum = await axiosInstace.get("profile/cart/sum", {
        withCredentials: true,
      });
      setSumPrice(getOffersSum.data.sumOfPrices);

      let response = await axiosInstace.get("profile/wallet", {
        withCredentials: true,
      });
      setWallet({ ...wallet, actualFunds: response.data.balance });
      setLoading(false);
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  const handleDeliveryForm = () => {
    setInvoiceForm(false);
    setInvoiceTabIndex(-1);
    setWalletForm(false);
    setWalletTabIndex(-1);
    !deliveryForm ? setDeliveryTabIndex(0) : setDeliveryTabIndex(-1);
    setDeliveryForm(!deliveryForm);
    setDeliveryAddress({
      firstName: deliveryAddressData.firstName,
      lastName: deliveryAddressData.lastName,
      phone: deliveryAddressData.phoneNumber,
      street: deliveryAddressData.addressStreet,
      building: deliveryAddressData.addressBuilding,
      apartment: deliveryAddressData.addressApartment,
      postalCode: deliveryAddressData.addressPostalCode,
      city: deliveryAddressData.addressCity,
      country: deliveryAddressData.addressCountry,
    });
    setDeliveryAddressErrors({
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      building: "",
      apartment: "",
      postalCode: "",
      city: "",
      country: "",
    });
    setResponseError("");
    setResponseSuccess("");
  };

  const handleInvoiceForm = () => {
    setDeliveryForm(false);
    setDeliveryTabIndex(-1);
    setWalletForm(false);
    setWalletTabIndex(-1);
    !invoiceForm ? setInvoiceTabIndex(0) : setInvoiceTabIndex(-1);
    setInvoiceForm(!invoiceForm);
    setInvoice({
      companyName: invoiceData.companyName,
      companyNip: invoiceData.companyVatId,
      street: invoiceData.companyAddressStreet,
      building: invoiceData.companyAddressBuilding,
      apartment: invoiceData.companyAddressApartment,
      postalCode: invoiceData.companyAddressPostalCode,
      city: invoiceData.companyAddressCity,
      country: invoiceData.companyAddressCountry,
    });
    setInvoiceErrors({
      companyName: "",
      companyNip: "",
      street: "",
      building: "",
      apartment: "",
      postalCode: "",
      city: "",
      country: "",
    });
    setResponseError("");
    setResponseSuccess("");
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleWalletForm = () => {
    setDeliveryForm(false);
    setDeliveryTabIndex(-1);
    setInvoiceForm(false);
    setInvoiceTabIndex(-1);
    !walletForm ? setWalletTabIndex(0) : setWalletTabIndex(-1);
    setWalletForm(!walletForm);
    setWallet({
      ...wallet,
      depositFunds: 0,
    });
    setWalletErrors({
      depositFunds: "",
    });
    setResponseError("");
    setResponseSuccess("");
  };

  const depositFundsHandler = async (e) => {
    e.preventDefault();
    if (wallet.depositFunds > 0 && wallet.depositFunds) {
      setWalletErrors({ ...walletErrors, depositFunds: "" });
      try {
        setLoadingDepositBtn(true);
        let responseDepositInfo = await axiosInstace.get(
          "profile/wallet/deposit",
          {
            withCredentials: true,
          }
        );
        console.log("response deposit info");
        setWalletErrors({ ...walletErrors, depositFunds: "" });

        const data = {
          amount: wallet.depositFunds,
          token: responseDepositInfo.data.title,
        };
        let responseDeposit = await axiosInstace.post(
          "profile/wallet/deposit",
          data,
          {
            withCredentials: true,
          }
        );
        console.log("response deposit");
        console.log(responseDeposit.data);
        setResponseSuccess(responseDeposit.data.message);
        setResponseError("");
        setWallet({
          ...wallet,
          actualFunds: responseDeposit.data.balanceAfterDeposit,
        });
      } catch (err) {
        setResponseError(err.response.data.message);
        setResponseSuccess("");
        errorResponseHandler(err);
        setLoadingDepositBtn(false);
      } finally {
        setLoadingDepositBtn(false);
      }
    } else {
      if (!wallet.depositFunds) {
        setWalletErrors({
          ...walletErrors,
          depositFunds: "Pole nie może być puste",
        });
      }
      if (wallet.depositFunds < 0) {
        setWalletErrors({
          ...walletErrors,
          depositFunds: "Kwota nie może być ujemna",
        });
      }
    }
  };

  const updateDeliveryData = (e) => {
    e.preventDefault();
    setResponseError("");
    if (
      deliveryAddress.firstName &&
      deliveryAddress.lastName &&
      deliveryAddress.phone &&
      deliveryAddress.street &&
      deliveryAddress.building &&
      deliveryAddress.postalCode &&
      deliveryAddress.city &&
      deliveryAddress.country
    ) {
      updateDeliveryAddressData({
        firstName: deliveryAddress.firstName,
        lastName: deliveryAddress.lastName,
        phoneNumber: deliveryAddress.phone,
        addressStreet: deliveryAddress.street,
        addressBuilding: deliveryAddress.building,
        addressApartment: deliveryAddress.apartment,
        addressPostalCode: deliveryAddress.postalCode,
        addressCity: deliveryAddress.city,
        addressCountry: deliveryAddress.country,
      });
    } else {
      setResponseSuccess("");
      setDeliveryAddressErrors({
        ...deliveryAddressErrors,
        firstName: !deliveryAddress.firstName ? "Pole nie może być puste" : "",
        lastName: !deliveryAddress.lastName ? "Pole nie może być puste" : "",
        phone: !deliveryAddress.phone ? "Pole nie może być puste" : "",
        street: !deliveryAddress.street ? "Pole nie może być puste" : "",
        building: !deliveryAddress.building ? "Pole nie może być puste" : "",
        apartment: "",
        postalCode: !deliveryAddress.postalCode
          ? "Pole nie może być puste"
          : "",
        city: !deliveryAddress.city ? "Pole nie może być puste" : "",
        country: !deliveryAddress.country ? "Pole nie może być puste" : "",
      });
    }
  };
  const updateInvoice = (e) => {
    e.preventDefault();
    setResponseError("");
    if (
      invoice.companyName &&
      invoice.companyNip &&
      invoice.street &&
      invoice.building &&
      invoice.postalCode &&
      invoice.city &&
      invoice.country
    ) {
      updateInvoiceData({
        companyName: invoice.companyName,
        companyVatId: invoice.companyNip,
        companyAddressStreet: invoice.street,
        companyAddressBuilding: invoice.building,
        companyAddressApartment: invoice.apartment,
        companyAddressPostalCode: invoice.postalCode,
        companyAddressCity: invoice.city,
        companyAddressCountry: invoice.country,
      });
    } else {
      setResponseSuccess("");
      setInvoiceErrors({
        ...invoiceErrors,
        companyName: !invoice.companyName ? "Pole nie może być puste" : "",
        companyNip: !invoice.companyNip ? "Pole nie może być puste" : "",
        street: !invoice.street ? "Pole nie może być puste" : "",
        building: !invoice.building ? "Pole nie może być puste" : "",
        apartment: "",
        postalCode: !invoice.postalCode ? "Pole nie może być puste" : "",
        city: !invoice.city ? "Pole nie może być puste" : "",
        country: !invoice.country ? "Pole nie może być puste" : "",
      });
    }
  };

  const handleButton = async () => {
    if (check) {
      if (!deliveryAddressData.addressStreet || !invoiceData.companyName) {
        if (!deliveryAddressData.addressStreet && !invoiceData.companyName) {
          setExecuteError("Uzupełnij dane do dostawy i faktury");
        } else if (!deliveryAddressData.addressStreet) {
          setExecuteError("Uzupełnij dane do dostawy");
        } else if (!invoiceData.companyName) {
          setExecuteError("Uzupełnij dane do faktury");
        }
      } else {
        setExecuteError("");
        console.log("click1");
        try {
          setLoadingExecuteBtn(true);
          const payment = () => (selectedPayment === "wallet" ? 1 : 2);
          const data = {
            paymentMethod: payment(),
            invoice: check,
          };
          const response = await axiosInstace.post(
            "profile/cart/execute",
            data,
            {
              withCredentials: true,
            }
          );

          await isCartsElements();
          console.log(response.data);
          setExecuteSuccess(response.data.message);
          setWallet({
            ...wallet,
            actualFunds: response.data.fundsAfterTransaction,
          });

          const getOffersSum = await axiosInstace.get("profile/cart/sum", {
            withCredentials: true,
          });
          setSumPrice(getOffersSum.data.sumOfPrices);
          setExecuteError("");
        } catch (err) {
          setLoadingExecuteBtn(false);
          console.log(err);
          setExecuteSuccess("");
          setExecuteError(err.response.data.message);
          errorResponseHandler(err);
        } finally {
          setLoadingExecuteBtn(false);
        }
      }
    } else {
      if (!deliveryAddressData.addressStreet) {
        setExecuteError("Uzupełnij dane do dostawy");
      } else {
        setExecuteError("");
        console.log("click2");
        try {
          setLoadingExecuteBtn(true);
          const payment = () => (selectedPayment === "wallet" ? 1 : 2);
          const data = {
            paymentMethod: payment(),
            invoice: check,
          };
          const response = await axiosInstace.post(
            "profile/cart/execute",
            data,
            {
              withCredentials: true,
            }
          );

          await isCartsElements();
          console.log(response.data);
          setExecuteSuccess(response.data.message);
          setWallet({
            ...wallet,
            actualFunds: response.data.fundsAfterTransaction,
          });

          const getOffersSum = await axiosInstace.get("profile/cart/sum", {
            withCredentials: true,
          });
          setSumPrice(getOffersSum.data.sumOfPrices);
          setExecuteError("");
        } catch (err) {
          setLoadingExecuteBtn(false);
          console.log(err);
          setExecuteSuccess("");
          setExecuteError(err.response.data.message);
          errorResponseHandler(err);
        } finally {
          setLoadingExecuteBtn(false);
        }
      }
    }
  };
  return (
    <div className="relative">
      <div className="px-5 flex flex-col-reverse lg:flex-row w-full xl:w-5/6 xl:mx-auto lg:gap-6">
        <section className="my-5 bg-zinc-200 rounded-lg p-6 shadow-lg lg:w-3/4">
          {loading ? (
            <div className="my-3 w-48 h-48 mx-auto">
              <Loading />
            </div>
          ) : (
            <>
              <section className="bg-white p-6 rounded-lg mb-5 shadow-lg">
                <h2 className="text-xl font-bold tracking-wider p-1 text-indigo-600">
                  Sposób płatności
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                  <div className="shadow-xl w-full p-4 rounded-xl text-lg">
                    <div className="flex items-center">
                      <input
                        className="w-5 h-5 m-2 accent-indigo-600 bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600 border-2 focus:outline-none focus:border-indigo-600 "
                        value="wallet"
                        checked={selectedPayment === "wallet"}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        type="radio"
                        id="payment2"
                        name="payment"
                      />
                      <label
                        className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                        htmlFor="payment2"
                      >
                        Za pomocą środków z portfela
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="w-5 h-5 m-2 accent-indigo-600 bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600 border-2 focus:outline-none focus:border-indigo-600 "
                        value="delivery"
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        checked={selectedPayment === "delivery"}
                        type="radio"
                        id="payment1"
                        name="payment"
                      />
                      <label
                        className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                        htmlFor="payment1"
                      >
                        Przy odbiorze
                      </label>
                    </div>
                  </div>
                  <div className="shadow-xl w-full p-4 rounded-xl text-lg">
                    <p className="text-indigo-600 px-2 pb-1 text-lg font-medium">
                      Aktualny stan środków: {wallet.actualFunds} PLN
                    </p>
                    <div className="w-fit">
                      <button
                        onClick={handleWalletForm}
                        className="w-full p-2 mt-4 mx-2 font-medium text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                      >
                        Doładuj
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 auto-rows-fr">
                <section className="bg-white p-6 rounded-lg mb-5 shadow-lg h-full">
                  <div>
                    <h2 className="text-2xl font-bold tracking-wider p-1 text-indigo-600">
                      Dane do dostawy
                    </h2>
                    <div className="relative w-full mx-4 text-indigo-600 font-medium">
                      {deliveryAddressData.addressStreet ? (
                        <div className="shadow-xl w-fit p-4 rounded-xl text-lg">
                          <p>
                            {deliveryAddressData.firstName}{" "}
                            {deliveryAddressData.lastName}
                          </p>
                          <p>
                            {deliveryAddressData.phoneNumber &&
                              "Telefon: " + deliveryAddressData.phoneNumber}
                          </p>
                          <p>
                            {deliveryAddressData.addressStreet}{" "}
                            {deliveryAddressData.addressBuilding}
                            {deliveryAddressData.addressApartment &&
                              "/" + deliveryAddressData.addressApartment}
                          </p>
                          <p>
                            {deliveryAddressData.addressPostalCode}{" "}
                            {deliveryAddressData.addressCity}
                          </p>
                          <p>{deliveryAddressData.addressCountry}</p>
                          <div className="w-fit">
                            <button
                              onClick={handleDeliveryForm}
                              className="w-full p-2 mt-4 font-medium text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                            >
                              Edytuj
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-fit">
                          <button
                            onClick={handleDeliveryForm}
                            className="w-full p-2 mt-4 font-medium text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                          >
                            Dodaj
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section className="bg-white p-6 rounded-lg shadow-lg h-full">
                  <h2 className="text-2xl font-bold tracking-wider p-1 text-indigo-600">
                    Dane do faktury
                  </h2>
                  <div className="flex items-center">
                    <input
                      className="w-5 h-5 m-2 accent-indigo-600 bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600 border-2 focus:outline-none focus:border-indigo-600 "
                      value={check}
                      onChange={(e) => setCheck(e.target.checked)}
                      type="checkbox"
                      id="invoice"
                      name="invoice"
                    />
                    <label
                      className="text-indigo-600 px-2 pb-1 text-lg"
                      htmlFor="invoice"
                    >
                      Chcę otrzymać fakturę na inne dane
                    </label>
                  </div>
                  {check && (
                    <div className="relative w-full mx-4 text-indigo-600 font-medium">
                      {invoiceData.companyName ? (
                        <div className="shadow-xl w-fit p-4 rounded-xl text-lg">
                          <p>{invoiceData.companyName}</p>
                          <p>
                            {invoiceData.companyVatId &&
                              "NIP: " + invoiceData.companyVatId}
                          </p>
                          <p>
                            {invoiceData.companyAddressStreet}{" "}
                            {invoiceData.companyAddressBuilding}
                            {invoiceData.companyAddressApartment &&
                              "/" + invoiceData.companyAddressApartment}
                          </p>
                          <p>
                            {invoiceData.companyAddressPostalCode}{" "}
                            {invoiceData.companyAddressCity}
                          </p>
                          <p>{invoiceData.companyAddressCountry}</p>
                          <div className="w-fit">
                            <button
                              onClick={handleInvoiceForm}
                              className="w-full p-2 mt-4 font-medium text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                            >
                              Edytuj
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-fit">
                          <button
                            onClick={handleInvoiceForm}
                            className="w-full p-2 mt-4 font-medium text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                          >
                            Dodaj
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </>
          )}
        </section>
        <section className="mt-5 bg-zinc-200 rounded-lg p-6 shadow-lg h-fit lg:w-1/4">
          {loading ? (
            <div className="my-3 w-28 h-28 mx-auto">
              <Loading />
            </div>
          ) : (
            <>
              <div className="flex justify-between font-bold text-indigo-600">
                <div>Do zapłaty:</div>
                <div className="text-right">
                  <p className="leading-3">{sumPrice} PLN</p>
                  <p className="text-sm text-indigo-500 font-semibold">
                    +darmowa dostawa
                  </p>
                </div>
              </div>
              <div>
                {executeError && (
                  <p className="text-red-500 sm:col-span-2 lg:col-span-3 text-base text-center font-medium">
                    {executeError}
                  </p>
                )}
                {executeSuccess && (
                  <p className="text-green-800 sm:col-span-2 lg:col-span-3 text-center font-medium">
                    {executeSuccess}
                  </p>
                )}
                {loadingExecuteBtn ? (
                  <button
                    onClick={handleButton}
                    disabled
                    className="w-full py-2 mt-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors opacity-70"
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
                    Autoryzowanie...
                  </button>
                ) : (
                  <button
                    onClick={handleButton}
                    className="w-full py-2 mt-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                  >
                    Kupuję
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </div>
      <section
        className={`absolute top-0 right-0 mt-20 w-full sm:w-3/5 xl:w-2/5 p-4 bg-gray-100 z-10 shadow-md h-fit rounded-l-xl transition-transform duration-300 ${
          !deliveryForm && "translate-x-full"
        }`}
      >
        <div>
          <div className="text-center mx-auto relative">
            <button
              tabIndex={deliveryTabIndex}
              onClick={handleDeliveryForm}
              className="w-7 absolute top-0 right-0 text-indigo-600 hover:text-indigo-800 focus:text-indigo-800 rounded-md border-2 border-transparent focus:outline-none focus:border-indigo-800 transition-colors"
            >
              <XIcon />
            </button>
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        firstName: e.target.value,
                      })
                    }
                    value={deliveryAddress.firstName}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.firstName ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="imie"
                    name="imie"
                    placeholder="Imię"
                  />
                  {deliveryAddressErrors.firstName && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.firstName}
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        lastName: e.target.value,
                      })
                    }
                    value={deliveryAddress.lastName}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.lastName ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="nazwisko"
                    name="nazwisko"
                    placeholder="Nazwisko"
                  />
                  {deliveryAddressErrors.lastName && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.lastName}
                </div>
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        phone: e.target.value,
                      })
                    }
                    value={deliveryAddress.phone}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.phone ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="numerTel"
                    name="numerTel"
                    placeholder="Numet telefonu"
                  />
                  {deliveryAddressErrors.phone && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.phone}
                </div>
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        street: e.target.value,
                      })
                    }
                    value={deliveryAddress.street}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.street ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="ulica"
                    name="ulica"
                    placeholder="Ulica"
                  />
                  {deliveryAddressErrors.street && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.street}
                </div>
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        building: e.target.value,
                      })
                    }
                    value={deliveryAddress.building}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.building ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="numerDomu"
                    name="numerDomu"
                    placeholder="Numer domu"
                  />
                  {deliveryAddressErrors.building && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.building}
                </div>
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        apartment: e.target.value,
                      })
                    }
                    value={deliveryAddress.apartment}
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        postalCode: e.target.value,
                      })
                    }
                    value={deliveryAddress.postalCode}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.postalCode ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="kodPocztowy"
                    name="kodPocztowy"
                    placeholder="Kod pocztowy"
                  />
                  {deliveryAddressErrors.postalCode && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.postalCode}
                </div>
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
                    tabIndex={deliveryTabIndex}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        city: e.target.value,
                      })
                    }
                    value={deliveryAddress.city}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.city ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="miasto"
                    name="miasto"
                    placeholder="Miasto"
                  />
                  {deliveryAddressErrors.city && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.city}
                </div>
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
                    tabIndex={deliveryTabIndex}
                    value={deliveryAddress.country}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliveryAddress,
                        country: e.target.value,
                      })
                    }
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      deliveryAddressErrors.country ? "!border-red-500" : ""
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
                  {deliveryAddressErrors.country && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {deliveryAddressErrors.country}
                </div>
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
                  tabIndex={deliveryTabIndex}
                  onClick={updateDeliveryData}
                >
                  Zapisz dane adresowe
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      <section
        className={`absolute top-0 right-0 mt-20 w-full sm:w-3/5 xl:w-2/5 p-4 bg-gray-100 z-10 shadow-md h-fit rounded-l-xl transition-transform duration-300 ${
          !invoiceForm && "translate-x-full"
        }`}
      >
        <div>
          <div className="text-center mx-auto relative">
            <button
              tabIndex={invoiceTabIndex}
              onClick={handleInvoiceForm}
              className="w-7 absolute top-0 right-0 text-indigo-600 hover:text-indigo-800 focus:text-indigo-800 rounded-md border-2 border-transparent focus:outline-none focus:border-indigo-800 transition-colors"
            >
              <XIcon />
            </button>
            <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
              Dane do faktury
            </h2>
            <form className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="mb-3">
                <label
                  className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                  htmlFor="nazwaFirmy"
                >
                  Nazwa firmy
                </label>
                <div className="relative">
                  <input
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, companyName: e.target.value })
                    }
                    value={invoice.companyName}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.companyName ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="nazwaFirmy"
                    name="nazwaFirmy"
                    placeholder="Nazwa firmy"
                  />
                  {invoiceErrors.companyName && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.companyName}
                </div>
              </div>

              <div className="mb-3">
                <label
                  className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                  htmlFor="nip"
                >
                  NIP
                </label>
                <div className="relative">
                  <input
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, companyNip: e.target.value })
                    }
                    value={invoice.companyNip}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.companyNip ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="nip"
                    name="nip"
                    placeholder="NIP"
                  />
                  {invoiceErrors.companyNip && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.companyNip}
                </div>
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
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, street: e.target.value })
                    }
                    value={invoice.street}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.street ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="ulica"
                    name="ulica"
                    placeholder="Ulica"
                  />
                  {invoiceErrors.street && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.street}
                </div>
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
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, building: e.target.value })
                    }
                    value={invoice.building}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.building ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="numerDomu"
                    name="numerDomu"
                    placeholder="Numer domu"
                  />
                  {invoiceErrors.building && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.building}
                </div>
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
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, apartment: e.target.value })
                    }
                    value={invoice.apartment}
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
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, postalCode: e.target.value })
                    }
                    value={invoice.postalCode}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.postalCode ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="kodPocztowy"
                    name="kodPocztowy"
                    placeholder="Kod pocztowy"
                  />
                  {invoiceErrors.postalCode && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.postalCode}
                </div>
              </div>

              <div className="mb-3 ">
                <label
                  className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                  htmlFor="miasto"
                >
                  Miasto
                </label>
                <div className="relative">
                  <input
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, city: e.target.value })
                    }
                    value={invoice.city}
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.city ? "!border-red-500" : ""
                    }`}
                    type="text"
                    id="miasto"
                    name="miasto"
                    placeholder="Miasto"
                  />
                  {invoiceErrors.city && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.city}
                </div>
              </div>

              <div className="mb-3 lg:col-span-2">
                <label
                  className="text-indigo-600 px-2 pb-1 text-lg font-medium"
                  htmlFor="miasto"
                >
                  Wybierz kraj
                </label>
                <div className="relative">
                  <select
                    value={invoice.country}
                    tabIndex={invoiceTabIndex}
                    onChange={(e) =>
                      setInvoice({ ...invoice, country: e.target.value })
                    }
                    className={`block appearance-none w-full py-3 px-3 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      invoiceErrors.country ? "!border-red-500" : ""
                    }`}
                  >
                    <option value="-" selected>
                      -
                    </option>
                    <option value="Polska">Polska</option>
                    <option value="Czehy">Czechy</option>
                    <option value="Niemcy">Niemcy</option>
                    <option value="Słowacja">Słowacja</option>
                    <option value="Ukraina">Ukraina</option>
                    <option value="Białoruś">Białoruś</option>
                  </select>
                  {invoiceErrors.country && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {invoiceErrors.country}
                </div>
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
                  tabIndex={invoiceTabIndex}
                  onClick={updateInvoice}
                >
                  Zapisz dane do faktury
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      <section
        className={`absolute top-0 right-0 mt-20 w-full sm:w-3/5 xl:w-2/5 p-4 bg-gray-100 z-10 shadow-md h-fit rounded-l-xl transition-transform duration-300 ${
          !walletForm && "translate-x-full"
        }`}
      >
        <div>
          <div className="text-center mx-auto relative">
            <button
              tabIndex={walletTabIndex}
              onClick={handleWalletForm}
              className="w-7 absolute top-0 right-0 text-indigo-600 hover:text-indigo-800 focus:text-indigo-800 rounded-md border-2 border-transparent focus:outline-none focus:border-indigo-800 transition-colors"
            >
              <XIcon />
            </button>
            <div>
              <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
                Aktualny stan środków:{" "}
                <span className="text-black">{wallet.actualFunds}</span> PLN
              </h3>
            </div>
            <h3 className="mb-3 text-2xl text-indigo-600 font-semibold tracking-wide">
              Doładuj środki
            </h3>
            <form>
              <div className="mb-3">
                <div className="relative">
                  <input
                    tabIndex={walletTabIndex}
                    onChange={(e) => {
                      const newVal = parseInt(e.target.value);
                      if (newVal >= 0) {
                        setWallet({ ...wallet, depositFunds: newVal });
                      } else {
                        setWallet({ ...wallet, depositFunds: 0 });
                      }
                    }}
                    onFocus={handleFocus}
                    value={wallet.depositFunds}
                    className={`block appearance-none w-full py-3 pl-3 pr-8 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                      walletErrors.depositFunds ? "!border-red-500" : ""
                    }`}
                    type="number"
                    placeholder="0.00"
                  />
                  {walletErrors.depositFunds && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ExclamationCircleIcon className="text-red-500 h-2/5" />
                    </div>
                  )}
                </div>
                <div className="text-red-500 text-sm ml-2 mt-1">
                  {walletErrors.depositFunds}
                </div>
              </div>

              {responseError && (
                <p className="text-red-500 text-center my-3 font-medium">
                  {responseError}
                </p>
              )}
              {responseSuccess && (
                <p className="text-green-800 text-center my-3 font-medium">
                  {responseSuccess}
                </p>
              )}
              {loadingDepositBtn ? (
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
        </div>
      </section>
    </div>
  );
}

export default Payment;
