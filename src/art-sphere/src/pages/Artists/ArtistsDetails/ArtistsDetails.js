import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import axiosInstace from "../../../api/axiosInstance";
import "./ArtistsDetails.css";
import Loading from "../../../components/Loading/Loading";

function ArtistsDetails(props) {
  useWebsiteTitle("Artyści - Szczegóły");
  const { artistId } = useParams();

  const [loading, setLoading] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [artist, setArtist] = useState(null);
  const [artistOffers, setArtistOffers] = useState(null);

  useEffect(() => {
    getArtist();
    getArtisOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArtist = async () => {
    try {
      const artistData = await axiosInstace.get(`artists/${artistId}`);
      console.log(artistData.data);
      setArtist(artistData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getArtisOffers = async () => {
    try {
      const artistOffersData = await axiosInstace.get(
        `artists/${artistId}/offers`
      );
      console.log(artistOffersData.data);
      setArtistOffers(artistOffersData.data);
      setLoadingOffers(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-20 w-full md:w-4/5 bg-zinc-200 rounded-lg p-2 md:p-6 mx-auto shadow-2xl">
          <h1 className="text-3xl font-extrabold tracking-widest mb-4 text-center text-indigo-400 rounded-md bg-black p-4 ">
            {artist.firstName} {artist.lastName}
          </h1>
          {artist.description ? (
            <div className="grid grid-cols-1 md:grid-cols-2 m-2">
              <div className="pr-0 md:pr-8">
                <div className="w-full md:h-96">
                  <img
                    src={artist.profilePicture}
                    alt="Zdjęcie produktu"
                    className="w-full max-w-full max-h-full h-full object-fill md:object-contain object-top block"
                  />
                </div>
              </div>

              <div>
                <div className="mb-4 mt-4">
                  <p className="text-indigo-800 font-bold">Opis:</p>
                  <p className="text-indigo-600 font-semibold">
                    {artist.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="pr-0 md:pr-8">
              <div className="w-full md:h-96">
                <img
                  src={artist.profilePicture}
                  alt="Zdjęcie produktu"
                  className="w-full max-w-full max-h-full h-full object-fill md:object-contain object-top block"
                />
              </div>
            </div>
          )}

          {loadingOffers ? (
            <Loading />
          ) : (
            <div className="m-7 lg:mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {artistOffers[0] && (
                <h2 className="text-2xl font-bold text-center text-indigo-800 col-span-full">
                  Dzieła Artysty:
                </h2>
              )}
              {artistOffers.map((item) => (
                <Link
                  to={`/galeria/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-lg shadow-xl w-auto h-fit sm:h-96 hover:opacity-75 transition-opacity"
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
                    <p className="text-lg font-bold mt-2">{item.price} PLN</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ArtistsDetails;
