import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayFiltersButton from "../../components/Inputs/DisplayFiltersButton";
import Filters from "../../components/Filters/Filters";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosInstace from "../../api/axiosInstance";
import "./gallery.css";

function Gallery(props) {
  useWebsiteTitle("Galeria");
  const { setSesionError } = useContext(AuthContext);

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
      const getOfferList = await axiosInstace.get("offers");
      console.log(getOfferList.data);
      setOfferList(getOfferList.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        className={`pl-1 py-1 transition-colors ${showFilters && "bg-gray-50"}`}
      >
        <DisplayFiltersButton onClick={handleClick} show={showFilters} />
      </div>
      <div>
        <div className={`filters shadow-md ${showFilters ? "show" : ""}`}>
          <Filters />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="m-7 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {offerList.map((item) => (
            <Link
              to={`/galeria/${item.id}`}
              key={item.id}
              className="bg-white rounded-lg shadow-xl w-auto h-fit sm:h-96 hover:opacity-75 transition-opacity border-transparent border-2 focus:outline-none focus:border-indigo-600"
            >
              <div className="w-full h-2/3">
                <img
                  className="w-full max-w-full max-h-full h-full object-contain object-center block pt-1"
                  src={item.photo}
                  alt={item.title}
                />
              </div>
              <div className="px-4 py-2 ">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-700 text-sm">
                  Autor: {item.artistName}
                </p>
                <p className="text-lg font-bold mt-2">{item.price} PLN</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
