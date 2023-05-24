import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "heroicons-react";
import Loading from "../../../components/Loading/Loading";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import axiosInstace from "../../../api/axiosInstance";

const Favorite = () => {
  useWebsiteTitle("Ulubione");

  const { errorResponseHandler } = useContext(AuthContext);

  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFavOffers = async () => {
    try {
      let response = await axiosInstace.get("offers/fav", {
        withCredentials: true,
      });
      console.log("respons ulubionych");
      console.log(response.data);
      setOfferList(response.data);
    } catch (err) {
      errorResponseHandler(err);
    }
    setLoading(false);
  };

  const removeFromFav = async (e, offerId) => {
    e.preventDefault();
    try {
      const removeOffer = await axiosInstace.delete(`offers/${offerId}/fav`, {
        withCredentials: true,
      });
      const actualFavorites = offerList.filter((item) => item.id !== offerId);
      setOfferList(actualFavorites);
      console.log(removeOffer);
    } catch (err) {
      errorResponseHandler(err);
    }
  };

  return (
    <div className="w-full text-center mx-auto">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
        Ulubione
      </h2>

      <div className="text-left">
        <div className="w-full">
          {loading ? (
            <div className="mt-16 w-48 h-48 mx-auto">
              <Loading />
            </div>
          ) : (
            <div className="m-7 grid grid-cols-1 auto-rows-min lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {offerList.map((item) => (
                <Link
                  to={`/galeria/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden h-fit lg:h-96 shadow-md w-auto hover:opacity-75 transition-opacity border-2 border-transparent focus:outline-none focus:border-indigo-600"
                >
                  <div className="w-full h-3/4 relative">
                    <img
                      className="w-full max-w-full max-h-full h-full object-contain object-center block p-1"
                      src={item.photo}
                      alt={item.title}
                    />
                  </div>
                  <div className="px-4 py-2 relative">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-lg font-bold mt-2">{item.price} PLN</p>
                    <button
                      onClick={(e) => removeFromFav(e, item.id)}
                      className="absolute right-3 top-3 text-yellow-400 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600"
                    >
                      <Star className="w-10 h-auto" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
