import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StarOutline } from "heroicons-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { pageSizes } from "../../data/paginationStaticData";
import DisplayFiltersButton from "../../components/Inputs/DisplayFiltersButton";
import Filters from "../../components/Filters/Filters";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosInstace from "../../api/axiosInstance";
import "./gallery.css";
import GenericComboImput from "../../components/Inputs/GenericComboInput";

function Gallery(props) {
  useWebsiteTitle("Galeria");
  const { setSesionError, user } = useContext(AuthContext);

  const [showFilters, setShowFilters] = useState(false);
  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "-",
    technic: "-",
    title: "",
    artist: "",
    topic: "-",
    priceBottom: 0,
    priceTop: 0, // 0 equal to "Not include in filtering"
    dimensionsXBottom: 0,
    dimensionsXTop: 0, // 0 equal to "Not include in filtering"
    dimensionsYBottom: 0,
    dimensionsYTop: 0, // 0 equal to "Not include in filtering"
    pageSize: 25,
    page: 1,
  });

  useEffect(() => {
    setSesionError("");
    getOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  const getOffers = async () => {
    const data = { ...filters };
    if (data.category === "-") {
      data.category = "";
    }
    if (data.technic === "-") {
      data.technic = "";
    }
    if (data.topic === "-") {
      data.topic = "";
    }

    try {
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

  const filterOffers = async () => {
    setShowFilters(!showFilters);
    setLoading(true);
    await getOffers();
  };

  const clearFilters = async () => {
    setShowFilters(!showFilters);
    setLoading(true);
    setFilters({
      category: "-",
      technic: "-",
      title: "",
      artist: "",
      topic: "-",
      priceBottom: 0,
      priceTop: 0, // 0 equal to "Not include in filtering"
      dimensionsXBottom: 0,
      dimensionsXTop: 0, // 0 equal to "Not include in filtering"
      dimensionsYBottom: 0,
      dimensionsYTop: 0, // 0 equal to "Not include in filtering"
      pageSize: 25,
      page: 1,
    });

    const data = {
      category: "-",
      technic: "-",
      title: "",
      artist: "",
      topic: "-",
      priceBottom: 0,
      priceTop: 0, // 0 equal to "Not include in filtering"
      dimensionsXBottom: 0,
      dimensionsXTop: 0, // 0 equal to "Not include in filtering"
      dimensionsYBottom: 0,
      dimensionsYTop: 0, // 0 equal to "Not include in filtering"
      pageSize: 25,
      page: 1,
    };
    if (data.category === "-") {
      data.category = "";
    }
    if (data.technic === "-") {
      data.technic = "";
    }
    if (data.topic === "-") {
      data.topic = "";
    }

    try {
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
          <Filters
            filters={filters}
            getFilters={(val) => setFilters(val)}
            search={filterOffers}
            clearFilters={clearFilters}
          />
        </div>
      </div>

      {loading ? (
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
          <>
            <div className="pt-4 px-7 flex justify-between items-center lg:px-20 border-t-2 border-b-2 border-indigo-600 text-indigo-600">
              <div className="flex items-center">
                Wyświetlanie
                <div className="mx-2 border-2 rounded-lg">
                  <GenericComboImput list={pageSizes} />
                </div>
                ofert na stronie
              </div>
              <div>pre/next</div>
            </div>
            {/* //! pagincja pokazówka */}
            <>
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">10</span> of{" "}
                      <span className="font-medium">97</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                      <a
                        href="#"
                        aria-current="page"
                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        3
                      </a>
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                        ...
                      </span>
                      <a
                        href="#"
                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                      >
                        8
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        9
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        10
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          </>
        </>
      )}
    </div>
  );
}

export default Gallery;
