import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useWebsiteTitle from "../../../../hooks/useWebsiteTitle";
import AuthContext from "../../../../context/AuthContext";
import axiosInstace from "../../../../api/axiosInstance";
import Loading from "../../../../components/Loading/Loading";

const OrderDetails = () => {
  useWebsiteTitle("Szczegóły zamówienia");
  const { errorResponseHandler } = useContext(AuthContext);

  const { orderId } = useParams();
  const [offer, setOffer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOfferData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOfferData = async () => {
    try {
      const getOffer = await axiosInstace.get(`profile/orders/${orderId}`, {
        withCredentials: true,
      });
      console.log(getOffer.data);
      setOffer(getOffer.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      errorResponseHandler(err);
    }
  };

  return (
    <div className="w-full lg:px-16 mx-auto">
      <h2 className="mb-5 text-4xl text-center text-indigo-600 font-semibold tracking-wider">
        Moje zakupy
      </h2>
      {loading ? (
        <div className="my-3 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : (
        offer.elements.map((item) => (
          <div
            className="md:flex bg-white p-6 rounded-lg mb-5 shadow-lg"
            key={item.offerId}
          >
            <div className="md:w-1/4 h-28 mx-auto mb-3 md:mb-0 md:mx-0">
              <img
                className="w-full max-w-full max-h-full h-full object-contain object-center block"
                src={item.photo}
                alt={item.title}
              />
            </div>
            <div className="relative xl:flex justify-between items-center w-full md:pl-10 md:pr-16">
              <div>
                <div className="text-xl font-bold tracking-wider p-1 text-indigo-600">
                  Temat:
                  <Link
                    to={`/galeria/${item.offerId}`}
                    className="underline hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md p-1 border-transparent focus:border-indigo-800"
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="text-base font-semibold tracking-wide p-1 text-indigo-600">
                  Autor:
                  <Link
                    to={`/artysci/${item.artistId}`}
                    className="underline hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md p-1 border-transparent focus:border-indigo-800"
                  >
                    {item.artistName}
                  </Link>
                </div>
              </div>
              <div className="relative font-medium text-indigo-600 xl:px-2">
                <div className="border-2 border-transparent">
                  Cena: {item.price} PLN
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-end ">
        <p className="w-full md:w-auto text-right bg-white p-6 rounded-lg mb-5 shadow-lg font-bold text-indigo-600">
          Suma: {offer.amount} PLN
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
