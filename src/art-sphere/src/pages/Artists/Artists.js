import { useContext, useEffect, useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Link } from "react-router-dom";
import artist_card from "../../data/artistData";
import AuthContext from "../../context/AuthContext";
import "./artists.css";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

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
      const getOfferList = await axios.get("http://127.0.0.1:5006/api/artists");
      console.log(getOfferList.data);
      setArtistList(getOfferList.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //tworzenie divy z artystami
  const listItems = artist_card.map((item) => (
    <Link to={`/artysci/${item.id}`}>
      <div className="artist_card" key={item.id}>
        <div className="artist_card_image">
          <img src={item.thumb} alt="" />
        </div>
        <div className="artist_card_name">
          <h3>
            {item.name} {item.surname}
          </h3>
        </div>
      </div>
    </Link>
  ));
  return (
    <>
      <div className="artists-container">
        <div className="artists">{listItems}</div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="m-7 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {artistList.map((item) => (
            <Link
              to={`/artysci/${item.id}`}
              key={item.id}
              className="bg-white rounded-lg shadow-xl w-auto h-fit sm:h-96 hover:opacity-75"
            >
              <div className="w-full h-3/4">
                <img
                  className="w-full max-w-full max-h-full h-full object-contain object-center block pt-1"
                  src={item.profilePicture}
                  alt={item.lastName}
                />
              </div>
              <div className="px-4 py-2">
                <p className="text-gray-700 text-center text-xl">
                  {item.firstName} {item.lastName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Artists;
