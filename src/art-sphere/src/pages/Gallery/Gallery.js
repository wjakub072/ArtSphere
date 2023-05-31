import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StarOutline } from "heroicons-react";
import DisplayFiltersButton from "../../components/Inputs/DisplayFiltersButton";
import Filters from "../../components/Filters/Filters";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosInstace from "../../api/axiosInstance";
import "./gallery.css";

function Gallery(props) {
  useWebsiteTitle("Galeria");
  const { setSesionError, user } = useContext(AuthContext);

  const [showFilters, setShowFilters] = useState(false);
  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSesionError("");
    getOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  const getOffers = async () => {
    try {
      const data = {
        Category: "",
        Technic: "",
        Title: "",
        Topic: "",
        PriceBottom: 0.0,
        PriceTop: 0.0, // 0 equal to "Not include in filtering"
        DimensionsXBottom: 0.0,
        DimensionsXTop: 0.0, // 0 equal to "Not include in filtering"
        DimensionsYBottom: 0.0,
        DimensionsYTop: 0.0, // 0 equal to "Not include in filtering"
        Unit: "cm",
        PageSize: 25,
        Page: 1,
      };
      if (!user) {
        const getOfferList = await axiosInstace.get("offers", {
          params: data,
        });
        console.log(getOfferList.data);
        setOfferList(getOfferList.data);
        setLoading(false);
      } else {
        const getOfferList = await axiosInstace.get("offers", {
          params: data,
          withCredentials: true,
        });
        console.log(getOfferList.data);
        setOfferList(getOfferList.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className={`pl-1 py-1 delay-100 transition-colors ${
          showFilters && "bg-gray-100"
        }`}
      >
        <DisplayFiltersButton onClick={handleClick} show={showFilters} />
      </div>
      <div>
        <div className={`filters shadow-md ${showFilters ? "show" : ""}`}>
          <Filters />
        </div>
      </div>

      {loading ? (
        <div className="mt-48 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : (
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
                {item.userFavorite ? (
                  <div className="absolute right-3 top-3 text-yellow-400 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600">
                    <StarOutline className="w-8 h-auto fill-yellow-400" />
                  </div>
                ) : (
                  <div className="absolute right-3 top-3 text-yellow-400 rounded-md border-transparent border-2 focus:outline-none focus:border-indigo-600">
                    <StarOutline className="w-8 h-auto" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
