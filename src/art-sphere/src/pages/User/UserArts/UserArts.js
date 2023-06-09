import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddArt from "../../../components/AddArt/AddArt";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import AuthContext from "../../../context/AuthContext";
import Loading from "../../../components/Loading/Loading";
import axiosInstace from "../../../api/axiosInstance";

const UserArts = () => {
  useWebsiteTitle("Twoje dzieła");
  const { errorResponseHandler } = useContext(AuthContext);

  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagesInfo, setPagesInfo] = useState({ pageSize: 200, page: 1 });
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getUserOffers();
    console.log("render");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserOffers = async () => {
    try {
      let response = await axiosInstace.get("offers/my", {
        params: pagesInfo,
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
    <div className="w-full text-center mx-auto">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
        Twoje dzieła
      </h2>
      <AddArt />

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
                  tabIndex={
                    item.archived || item.isAuction || item.sold ? -1 : 0
                  }
                  to={
                    item.archived || item.isAuction || item.sold
                      ? ``
                      : `/profil/twojeDziela/edycja/${item.id}`
                  }
                  key={item.id}
                  className={
                    item.archived || item.isAuction || item.sold
                      ? `bg-white rounded-lg overflow-hidden h-fit lg:h-96 shadow-md w-auto border-2 border-transparent cursor-default focus:outline-none`
                      : `bg-white rounded-lg overflow-hidden h-fit lg:h-96 shadow-md w-auto hover:opacity-75 transition-opacity border-2 border-transparent focus:outline-none focus:border-indigo-600`
                  }
                >
                  <div className="w-full h-3/4 relative">
                    <img
                      className="w-full max-w-full max-h-full h-full object-contain object-center block p-1"
                      src={item.photo}
                      alt={item.title}
                    />
                    {(item.archived || item.sold) && (
                      <div className="bg-white opacity-80 shadow-xl p-2 rounded-md absolute top-0 left-1/2 -translate-x-1/2 font-extrabold text-indigo-600 text-3xl">
                        <p>SPRZEDANE</p>
                      </div>
                    )}
                    {item.isAuction && !item.archived && !item.sold && (
                      <div className="bg-white opacity-80 shadow-xl p-2 rounded-md absolute top-0 left-1/2 -translate-x-1/2 font-extrabold text-indigo-600 text-3xl">
                        <p>LICYTACJA</p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2">
                    <h2 className="text-lg font-bold text-indigo-600">
                      {item.title}
                    </h2>
                    <p className="text-lg font-bold mt-2 text-indigo-600">
                      {item.price} PLN
                    </p>
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
