import { useParams } from "react-router-dom";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import artist_card from "../../../data/artistData";
import "./ArtistsDetails.css";

function ArtistsDetails(props) {
  const { artistId } = useParams();
  useWebsiteTitle("Artyści - Szczegóły");

  console.log(artistId);
  const artist = artist_card.find((artist) => artist.id === parseInt(artistId));
  console.log(artist);

  return (
    <div className="container flex bg-dark-subtle rounded-3 mt-5 p-3">
      <h1 className="w-1/2 text-3xl font-bold mb-4 text-center text-white bg-black rounded p-4 opacity-75">
        {artist.name + " " + artist.surname}
      </h1>
      <div className="flex">
        <div className="w-1/2">
          <img
            src={artist.thumb}
            alt="Zdjęcie artysty"
            className="w-3/4 h-auto rounded mx-auto"
          />
        </div>
        <div className="w-1/2 px-8 mt-5 self-center">
          <div className="mb-4">
            <p className="text-gray-600 font-semibold">Opis:</p>
            <p className="text-black">{artist.description}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Spis prac:</h2>
        <ul className="list-disc list-inside">
          <li className="text-gray-600">Obraz 1</li>
          <li className="text-gray-600">Obraz 2</li>
          <li className="text-gray-600">Obraz 3</li>
        </ul>
      </div>
    </div>
  );
}

export default ArtistsDetails;
