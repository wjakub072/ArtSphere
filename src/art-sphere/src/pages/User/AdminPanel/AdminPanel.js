import { useContext, useEffect, useState } from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import axiosInstace from "../../../api/axiosInstance";
import Loading from "../../../components/Loading/Loading";
import AuthContext from "../../../context/AuthContext";

function AdminPanel(props) {
  useWebsiteTitle("Panel administratora");
  const { errorResponseHandler } = useContext(AuthContext);

  const [offerToValidate, setOfferToValidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    getOfferToValidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOfferToValidate = async () => {
    try {
      const response = await axiosInstace.get("offers/validate", {
        withCredentials: true,
      });
      console.log("respons ofert do walidacji");
      console.log(response.data);
      setOfferToValidate(response.data);
    } catch (err) {
      errorResponseHandler(err);
    }
    setLoading(false);
  };

  const validateOffer = async (offerId, validateResult) => {
    try {
      setLoadingButton(true);
      const data = {
        result: validateResult,
      };
      const response = await axiosInstace.post(
        `offers/${offerId}/validate`,
        data,
        {
          withCredentials: true,
        }
      );
      await getOfferToValidate();
      console.log("respons walidacji ofert");
      console.log(response.data);
    } catch (err) {
      errorResponseHandler(err);
      setLoadingButton(false);
    } finally {
      setLoadingButton(false);
    }
  };
  return (
    <div className="text-center mx-auto w-full">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wide">
        Zatwierdzanie ofert
      </h2>
      {loading ? (
        <div className="mt-16 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : (
        <>
          <div className="w-full mx-auto">
            <h1 className="text-3xl font-extrabold tracking-widest mb-4 text-center text-indigo-400 rounded-md bg-black p-4 ">
              {offerToValidate.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 m-2">
              <div className="pr-0 md:pr-8">
                <div className="w-full md:h-96">
                  <img
                    src={offerToValidate.photo}
                    alt="Zdjęcie produktu"
                    className="w-full max-w-full max-h-full h-full object-fill md:object-contain object-top block"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4 mt-4 md:mt-0">
                  <p className="text-indigo-800 font-bold">Autor:</p>
                  <p className="text-indigo-600 font-semibold underline hover:text-indigo-900 focus:text-indigo-900 p-0.5 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600 transition-colors ">
                    {offerToValidate.artistName}
                  </p>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  <div>
                    <p className="text-indigo-800 font-bold">Wymiary:</p>
                    <p className="text-indigo-600 font-semibold">
                      {offerToValidate?.dimensionsY}cm x{" "}
                      {offerToValidate?.dimensionsX}cm
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-indigo-800 font-bold">Tagi:</p>
                    <p className="text-indigo-600 font-semibold">
                      {offerToValidate?.tags?.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="mb-4 mt-4">
                  <p className="text-indigo-800 font-bold">Opis produktu:</p>
                  <p className="text-indigo-600 font-semibold">
                    {offerToValidate?.description}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-indigo-800 font-bold">Cena:</p>
                  <p className="text-indigo-600 font-semibold">
                    {offerToValidate.price} zł
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {loadingButton ? (
              <button
                type="button"
                className="w-1/2 p-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm opacity-70"
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
                className="w-1/2 p-2 mb-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
                type="button"
                onClick={() => validateOffer(offerToValidate.id, true)}
              >
                Zatwierdź
              </button>
            )}
            {loadingButton ? (
              <button
                type="button"
                className="w-1/2 p-2 mb-4 font-medium text-white bg-red-500 rounded-md shadow-sm opacity-70"
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
                className="w-1/2 p-2 mb-4 font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:bg-red-600 border-2 border-transparent focus:outline-none focus:border-red-400 transition-colors"
                type="button"
                onClick={() => validateOffer(offerToValidate.id, false)}
              >
                Odrzuć
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default AdminPanel;
