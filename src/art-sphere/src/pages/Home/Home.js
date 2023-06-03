import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosInstace from "../../api/axiosInstance";

function Home(props) {
  useWebsiteTitle("Strona główna");
  const { setSesionError } = useContext(AuthContext);
  const [offerList, setOfferList] = useState({});
  const [auctionList, setAuctionList] = useState({});
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingAuctions, setLoadingAuctions] = useState(true);

  useEffect(() => {
    setSesionError("");
    getOffers();
    getAuctions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOffers = async () => {
    try {
      const getOfferList = await axiosInstace.get("offers/latest", {
        params: { type: "offer", pageSize: 5, page: 1 },
      });
      console.log(getOfferList.data);
      setOfferList(getOfferList.data);
      setLoadingOffers(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getAuctions = async () => {
    try {
      const getAuctionsList = await axiosInstace.get("offers/latest", {
        params: { type: "auction", pageSize: 5, page: 1 },
      });
      console.log(getAuctionsList.data);
      setAuctionList(getAuctionsList.data);
      setLoadingAuctions(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold text-indigo-600 text-4xl mt-6 tracking-widest">
        Najnowsze licytacje
      </h2>
      {loadingAuctions ? (
        <div className="mt-48 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : (
        <>
          <div className="m-7 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {auctionList.map((item) => (
              <Link
                to={`/galeria/${item.id}`}
                key={item.id}
                className="bg-white rounded-lg shadow-xl w-auto h-fit sm:h-96 hover:opacity-75 transition-opacity border-transparent border-2 focus:outline-none focus:border-indigo-600"
              >
                <div className="w-full h-2/3 relative">
                  <img
                    className="w-full max-w-full max-h-full h-full object-contain object-center block pt-1"
                    src={item.photo}
                    alt={item.title}
                  />
                </div>
                <div className="px-4 py-2 relative">
                  <h2 className="text-lg font-bold text-indigo-700">
                    {item.title}
                  </h2>
                  <p className="text-sm text-indigo-600">
                    Autor: {item.artistName}
                  </p>
                  <p className="text-lg font-bold mt-2 text-indigo-700">
                    {item.price} PLN
                  </p>
                  {item.isAuction && (
                    <div className="absolute w-8 h-auto right-4 top-3 fill-indigo-700 translate-y-full -scale-x-100 mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="text-center font-bold text-indigo-600 text-4xl mt-6 tracking-widest">
        Najnowsze oferty
      </h2>
      {loadingOffers ? (
        <div className="mt-48 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : (
        <>
          <div className="m-7 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {offerList.map((item) => (
              <Link
                to={`/galeria/${item.id}`}
                key={item.id}
                className="bg-white rounded-lg shadow-xl w-auto h-fit sm:h-96 hover:opacity-75 transition-opacity border-transparent border-2 focus:outline-none focus:border-indigo-600"
              >
                <div className="w-full h-2/3 relative">
                  <img
                    className="w-full max-w-full max-h-full h-full object-contain object-center block pt-1"
                    src={item.photo}
                    alt={item.title}
                  />
                </div>
                <div className="px-4 py-2 relative">
                  <h2 className="text-lg font-bold text-indigo-700">
                    {item.title}
                  </h2>
                  <p className="text-sm text-indigo-600">
                    Autor: {item.artistName}
                  </p>
                  <p className="text-lg font-bold mt-2 text-indigo-700">
                    {item.price} PLN
                  </p>
                  {item.isAuction && (
                    <div className="absolute w-8 h-auto right-4 top-3 fill-indigo-700 translate-y-full -scale-x-100 mt-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
