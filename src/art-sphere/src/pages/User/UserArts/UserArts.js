import { useContext, useEffect, useState } from "react";
import AddArt from "../../../components/AddArt/AddArt";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const UserArts = () => {
  useWebsiteTitle("Twoje dzieła");
  const { errorResponseHandler } = useContext(AuthContext);

  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserOffers = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:5006/api/offers/my", {
        withCredentials: true,
      });
      console.log("respons ofert użytkownika");
      console.log(response.data);
      setOfferList(response.data);
    } catch (err) {
      errorResponseHandler(err);
    }
    setLoading(false);
  };
  return (
    <div className="user-user-arts-wrap">
      <h2 className="mt-2">Twoje dzieła</h2>
      <AddArt />

      <div className="offers-container">
        <div className="offers w-full">
          {loading ? (
            <Loading />
          ) : (
            <div className="m-7 grid grid-cols-1 auto-rows-min xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {offerList.map((item) => (
                <Link
                  to={`/galeria/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden h-fit xl:h-96 shadow-md w-auto hover:opacity-75"
                >
                  <div className="w-full h-3/4">
                    <img
                      className="w-full max-w-full max-h-full h-full object-contain object-center block p-1"
                      src={item.photo}
                      alt={item.title}
                    />
                  </div>
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-lg font-bold mt-2">{item.price} PLN</p>
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

export default UserArts;
