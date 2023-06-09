import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StarOutline } from "heroicons-react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import AuthContext from "../../../context/AuthContext";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import Loading from "../../../components/Loading/Loading";
import axiosInstace from "../../../api/axiosInstance";

function OfferDetails() {
  useWebsiteTitle("Oferty - Szczegóły");
  const { user, errorResponseHandler, isCartsElements } =
    useContext(AuthContext);

  const { offerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState(null);
  const [addCartSuccess, setAddCartSuccess] = useState("");
  const [addCartError, setAddCartError] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [bidValue, setBidValue] = useState(0);
  const [bidValueErrors, setBidValueErrors] = useState("");

  useEffect(() => {
    if (!bidValue) {
      setBidValueErrors("Pole nie może być puste");
    } else if (bidValue < 0) {
      setBidValueErrors("Kwota nie może być ujemna");
    } else if (bidValue <= offer.price) {
      setBidValueErrors("Kwota nie może być mniejsza od aktualnej ceny");
    } else {
      setBidValueErrors("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidValue]);

  useEffect(() => {
    setBidValueErrors("");
    getOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setAddCartError("");
      setAddCartSuccess("");
    };
  }, []);

  const getOffer = async () => {
    try {
      const offerData = await axiosInstace.get(`offers/${offerId}`);
      await isFavorite();
      console.log(offerData.data);
      setOffer(offerData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addOfferToCart = async () => {
    if (!user) {
      setAddCartError("Nie jesteś zalogowany");
      return;
    }
    if (user) {
      try {
        setLoadingBtn(true);
        const addOffer = await axiosInstace.post(
          `profile/cart/${offerId}`,
          null,
          {
            withCredentials: true,
          }
        );
        console.log(addOffer.data);
        await isCartsElements();
        setAddCartError("");
        setAddCartSuccess("Dodano do koszyka");
      } catch (err) {
        console.log(err);
        setAddCartSuccess("");
        setAddCartError(err.response?.data.message);
        errorResponseHandler(err);
        setLoadingBtn(false);
      } finally {
        setLoadingBtn(false);
      }
    }
  };

  const isFavorite = async () => {
    if (!user) {
      // setAddCartError("Nie jesteś zalogowany");
      return;
    }
    if (user) {
      try {
        const isFav = await axiosInstace.get(`offers/${offerId}/isfav`, {
          withCredentials: true,
        });
        setIsFav(isFav.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addToFav = async () => {
    if (!user) {
      return;
    }
    if (user) {
      try {
        const addOffer = await axiosInstace.put(`offers/${offerId}/fav`, null, {
          withCredentials: true,
        });
        await isFavorite();
        console.log(addOffer);
        console.log("Dodano do Uluionych");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeFromFav = async () => {
    if (!user) {
      return;
    }
    if (user) {
      try {
        const removeOffer = await axiosInstace.delete(`offers/${offerId}/fav`, {
          withCredentials: true,
        });
        await isFavorite();
        console.log(removeOffer);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleBid = (e) => {
    const newVal = parseInt(e.target.value);
    if (newVal >= 0) {
      setBidValue(newVal);
    } else {
      setBidValue(0);
    }
  };

  const addBid = async () => {
    if (!user) {
      setAddCartError("Nie jesteś zalogowany");
      return;
    }
    if (user) {
      if (!bidValue) {
        setBidValueErrors("Pole nie może być puste");
        return;
      }
      try {
        setLoadingBtn(true);
        const addBid = await axiosInstace.post(
          `offers/${offerId}/bid`,
          { amount: bidValue },
          {
            withCredentials: true,
          }
        );
        console.log(addBid.data);
        await getOffer();
        setAddCartError("");
        setAddCartSuccess("Podbito cenę");
      } catch (err) {
        console.log(err);
        setAddCartSuccess("");
        setAddCartError(err.response?.data.message);
        errorResponseHandler(err);
        setLoadingBtn(false);
      } finally {
        setLoadingBtn(false);
      }
    }
  };

  return loading ? (
    <div className="mt-48 w-48 h-48 mx-auto">
      <Loading />
    </div>
  ) : (
    <div className="mt-20 w-full md:w-4/5 bg-zinc-200 rounded-lg p-2 md:p-6 mx-auto shadow-2xl">
      <h1 className="text-3xl font-extrabold tracking-widest mb-4 text-center text-indigo-400 rounded-md bg-black p-4 ">
        {offer.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 m-2">
        <div className="pr-0 md:pr-8">
          <div className="w-full md:h-96">
            <img
              src={offer.photo}
              alt="Zdjęcie produktu"
              className="w-full max-w-full max-h-full h-full object-fill md:object-contain object-top block"
            />
          </div>
        </div>
        <div>
          <div className="relative">
            {isFav ? (
              <button
                onClick={removeFromFav}
                className=" absolute right-0 top-4 text-yellow-400 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600"
              >
                <StarOutline className="w-10 h-auto fill-yellow-400" />
              </button>
            ) : (
              <button
                onClick={addToFav}
                className="absolute right-0 top-4 text-yellow-400 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600"
              >
                <StarOutline className="w-10 h-auto" />
              </button>
            )}
          </div>
          <div className="relative">
            {offer.isAuction && (
              <div className="absolute w-8 h-auto right-1 top-4 fill-indigo-700 translate-y-full -scale-x-100 mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                </svg>
              </div>
            )}
          </div>
          <div className="mb-4 mt-4 md:mt-0">
            <p className="text-indigo-800 font-bold">Autor:</p>
            <Link
              to={`/artysci/${offer.artistId}`}
              className="text-indigo-600 font-semibold underline hover:text-indigo-900 focus:text-indigo-900 p-0.5 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600 transition-colors "
            >
              {offer.artistName}
            </Link>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <p className="text-indigo-800 font-bold">Kategoria:</p>
              <p className="text-indigo-600 font-semibold">{offer.category}</p>
            </div>
            <div>
              <p className="text-indigo-800 font-bold">Temat:</p>
              <p className="text-indigo-600 font-semibold">{offer.topic}</p>
            </div>
            <div>
              <p className="text-indigo-800 font-bold">Technika:</p>
              <p className="text-indigo-600 font-semibold">{offer.technic}</p>
            </div>
            <div>
              <p className="text-indigo-800 font-bold">Wymiary:</p>
              <p className="text-indigo-600 font-semibold">
                {offer.dimensionsY}cm x {offer.dimensionsX}cm
              </p>
            </div>
            <div className="col-span-2">
              {offer.tags[0] && (
                <>
                  <p className="text-indigo-800 font-bold">Tagi:</p>
                  <p className="text-indigo-600 font-semibold">
                    {offer.tags.join(", ")}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mb-4 mt-4">
            <p className="text-indigo-800 font-bold">Opis produktu:</p>
            <p className="text-indigo-600 font-semibold">{offer.description}</p>
          </div>
          <div className="mb-4">
            <p className="text-indigo-800 font-bold">
              {offer.isAuction ? "Aktualna cena licytacji:" : "Cena:"}
            </p>

            <p className="text-indigo-600 font-semibold">{offer.price} PLN</p>
          </div>
          {offer.isAuction && (
            <div className="mb-4">
              <p className="text-indigo-800 font-bold">
                Data zakończenia licytacji:
              </p>

              <p className="text-indigo-600 font-semibold">
                {new Date(offer.auctionEndTime).toLocaleString("pl-PL", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          {(offer.archived || offer.sold) && (
            <button
              className="py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm transition-colors opacity-70"
              disabled
            >
              Produkt niedostępny
            </button>
          )}
          {loadingBtn && !offer.archived && !offer.isAuction && !offer.sold && (
            <button
              disabled
              className="py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm  border-transparent border-2 transition-colors"
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
              Dodawanie...
            </button>
          )}
          {!loadingBtn &&
            !offer.archived &&
            !offer.isAuction &&
            !offer.sold && (
              <div>
                {addCartError && (
                  <p className="p-2 text-red-500 font-bold">{addCartError}</p>
                )}
                {addCartSuccess && (
                  <p className="p-2 text-green-800 font-bold">
                    {addCartSuccess}
                  </p>
                )}
                <button
                  onClick={addOfferToCart}
                  className="py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-transparent border-2 focus:outline-none focus:border-indigo-400 transition-colors"
                >
                  Dodaj do koszyka
                </button>
              </div>
            )}
          <div className="grid gap-x-4 gap-y-3 grid-cols-1 md:grid-cols-2 ">
            {offer.isAuction && !offer.archived && !offer.sold && (
              <>
                <label className="text-indigo-800 font-bold text-center md:col-span-2">
                  Do jakiej ceny chcesz podbić?
                </label>

                <div>
                  <div className="relative">
                    <input
                      onChange={handleBid}
                      onFocus={handleFocus}
                      value={bidValue}
                      className={`block appearance-none w-full py-3 pl-3 pr-8 leading-tight rounded-xl border-2 border-transparent focus:outline-none focus:border-indigo-600 ${
                        bidValueErrors ? "!border-red-500" : ""
                      }`}
                      type="number"
                      placeholder="0.00"
                    />
                    {bidValueErrors && (
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <ExclamationCircleIcon className="text-red-500 h-2/5" />
                      </div>
                    )}
                  </div>
                  <div className="text-red-500 text-sm ml-2 mt-1">
                    {bidValueErrors}
                  </div>
                </div>
              </>
            )}

            {!loadingBtn &&
              !offer.archived &&
              !offer.sold &&
              offer.isAuction && (
                <div>
                  <button
                    onClick={addBid}
                    className="w-full py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-transparent border-2 focus:outline-none focus:border-indigo-400 transition-colors"
                  >
                    Podbij cene
                  </button>
                  {addCartError && (
                    <p className="p-2 text-red-500 text-center font-bold">
                      {addCartError}
                    </p>
                  )}
                  {addCartSuccess && (
                    <p className="p-2 text-green-800 text-center font-bold">
                      {addCartSuccess}
                    </p>
                  )}
                </div>
              )}
            {loadingBtn &&
              !offer.archived &&
              !offer.sold &&
              offer.isAuction && (
                <div>
                  <button
                    disabled
                    className="w-full py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm border-transparent border-2 transition-colors opacity-85"
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
                    Przetwarzanie...
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferDetails;
