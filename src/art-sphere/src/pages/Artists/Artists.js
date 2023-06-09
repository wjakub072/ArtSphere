import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosInstace from "../../api/axiosInstance";

function Artists(props) {
  useWebsiteTitle("Artyści");
  const { setSesionError } = useContext(AuthContext);

  const [artistList, setArtistList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSesionError("");
    getArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArtists = async () => {
    try {
      const getOfferList = await axiosInstace.get("artists");
      console.log(getOfferList.data);
      setArtistList(getOfferList.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <div className="mt-48 w-48 h-48 mx-auto">
      <Loading />
    </div>
  ) : (
    <div className="m-7 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {artistList.map((item) => (
        <Link
          to={`/artysci/${item.id}`}
          key={item.id}
          className="bg-white rounded-lg shadow-xl w-auto h-fit sm:h-96 hover:opacity-75 transition-opacity border-transparent border-2 focus:outline-none focus:border-indigo-600"
        >
          <div className="w-full h-3/4">
            <img
              className="w-full max-w-full max-h-full h-full object-contain object-center block pt-1"
              src={item.profilePicture}
              alt={item.lastName}
            />
          </div>
          <div className="px-4 py-2">
            <p className="text-indigo-700 text-center font-bold text-xl">
              {item.firstName} {item.lastName}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Artists;
