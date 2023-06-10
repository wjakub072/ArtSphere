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
    includeSold: true,
    includeArchived: true,
    tags: [],
    pageSize: 25,
    page: 1,
  });
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setSesionError("");
    getOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  const getOffers = async () => {
    const data = {
      ...filters,
      tags: filters.tags[0]
        ? filters.tags.split(",").map((tag) => tag.trim())
        : [],
      page: 1,
    };
    console.log(data);
    setFilters({ ...filters, page: 1 });
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
      const pageCountResponse = await axiosInstace.get("offers/count", {
        params: data,
        paramsSerializer: {
          indexes: null,
        },
      });
      console.log(pageCountResponse.data);
      setPageCount(pageCountResponse.data.pageCount);
    } catch (err) {
      console.log(err);
    }

    try {
      if (!user) {
        const getOfferList = await axiosInstace.get("offers", {
          params: data,
          paramsSerializer: {
            indexes: null,
          },
        });
        console.log(getOfferList.data);
        setOfferList(getOfferList.data);
        setLoading(false);
      } else {
        const getOfferList = await axiosInstace.get("offers", {
          params: data,
          paramsSerializer: {
            indexes: null,
          },
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
      includeSold: true,
      includeArchived: true,
      tags: [],
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
      includeSold: true,
      includeArchived: true,
      tags: [],
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
          paramsSerializer: {
            indexes: null,
          },
        });
        console.log(getOfferList.data);
        setOfferList(getOfferList.data);
        setLoading(false);
      } else {
        const getOfferList = await axiosInstace.get("offers", {
          params: data,
          paramsSerializer: {
            indexes: null,
          },
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

  const nextPage = async () => {
    setLoading(true);
    if (filters.page < pageCount) {
      const data = {
        ...filters,
        tags: filters.tags[0]
          ? filters.tags.split(",").map((tag) => tag.trim())
          : [],
        page: filters.page + 1,
      };
      setFilters({
        ...filters,
        tags: filters.tags[0]
          ? filters.tags.split(",").map((tag) => tag.trim())
          : [],
        page: filters.page + 1,
      });
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
        const pageCountResponse = await axiosInstace.get("offers/count", {
          params: data,
          paramsSerializer: {
            indexes: null,
          },
        });
        console.log(pageCountResponse.data);
        setPageCount(pageCountResponse.data.pageCount);
      } catch (err) {
        console.log(err);
      }

      try {
        if (!user) {
          const getOfferList = await axiosInstace.get("offers", {
            params: data,
            paramsSerializer: {
              indexes: null,
            },
          });
          console.log(getOfferList.data);
          await setOfferList(getOfferList.data);
          setLoading(false);
        } else {
          const getOfferList = await axiosInstace.get("offers", {
            params: data,
            paramsSerializer: {
              indexes: null,
            },
            withCredentials: true,
          });
          console.log(getOfferList.data);
          setOfferList(getOfferList.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const prevPage = async () => {
    setLoading(true);
    if (filters.page <= pageCount && filters.page > 1) {
      const data = {
        ...filters,
        tags: filters.tags[0]
          ? filters.tags.split(",").map((tag) => tag.trim())
          : [],
        page: filters.page - 1,
      };
      setFilters({
        ...filters,
        tags: filters.tags[0]
          ? filters.tags.split(",").map((tag) => tag.trim())
          : [],
        page: filters.page - 1,
      });
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
        const pageCountResponse = await axiosInstace.get("offers/count", {
          params: data,
          paramsSerializer: {
            indexes: null,
          },
        });
        console.log(pageCountResponse.data);
        setPageCount(pageCountResponse.data.pageCount);
      } catch (err) {
        console.log(err);
      }

      try {
        if (!user) {
          const getOfferList = await axiosInstace.get("offers", {
            params: data,
            paramsSerializer: {
              indexes: null,
            },
          });
          console.log(getOfferList.data);
          await setOfferList(getOfferList.data);
          setLoading(false);
        } else {
          const getOfferList = await axiosInstace.get("offers", {
            params: data,
            paramsSerializer: {
              indexes: null,
            },
            withCredentials: true,
          });
          console.log(getOfferList.data);
          setOfferList(getOfferList.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
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
                  {item.sold && (
                    <div className="absolute w-8 h-auto right-12 top-3">
                      <img
                        src={require("../../assets/free_icon_1.svg").default}
                        alt=""
                        className="fill-indigo-700"
                      ></img>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <>
            {pageCount > 1 && (
              <div className="py-4 px-7 flex justify-center items-center bg-gray-100 lg:px-20 border-t-2  border-indigo-600 text-indigo-600">
                <div className="flex flex-1 justify-around text-indigo-600">
                  <button
                    className="rounded-lg border-2 border-transparent shadow-md bg-white px-4 py-2 text-sm font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-400 focus:bg-indigo-600 focus:text-white disabled:opacity-70"
                    onClick={prevPage}
                    disabled={filters.page === 1 ? true : false}
                  >
                    Poprzednia
                  </button>
                  <button
                    className="rounded-lg border-2 border-transparent shadow-md bg-white px-4 py-2 text-sm font-medium hover:bg-indigo-600 hover:text-white hover:border-indigo-400 transition-colors focus:outline-none focus:border-indigo-400 focus:bg-indigo-600 focus:text-white disabled:opacity-70"
                    onClick={nextPage}
                    disabled={pageCount === filters.page ? true : false}
                  >
                    Następna
                  </button>
                </div>
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
}

export default Gallery;
