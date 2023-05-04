import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";

function OfferDetails() {
  const { offerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    getOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOffer = async () => {
    try {
      const offerData = await axios.get(
        `http://127.0.0.1:5006/api/offers/${offerId}`
      );
      console.log(offerData.data);
      setOffer(offerData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(offer);

  return loading ? (
    <Loading />
  ) : (
    <div className="mt-20 w-full md:w-4/5 bg-zinc-200 rounded-lg p-2 md:p-6 mx-auto shadow-2xl">
      <h1 className="text-3xl font-extrabold tracking-widest mb-4 text-center text-indigo-400 rounded-md bg-black p-4 ">
        {offer.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 m-2">
        <div className="pr-0 md:pr-8">
          <div className="w-full md:h-96">
            <img
              src={offer.photo}
              alt="Zdjęcie produktu"
              className="w-full max-w-full max-h-full h-full object-fill md:object-contain object-top block"
            />
          </div>
        </div>
        <div>
          <div className="mb-4 mt-4 md:mt-0">
            <p className="text-indigo-800 font-bold">Autor:</p>
            <Link
              to={`/artysci/${offer.artistId}`}
              className="text-indigo-600 font-semibold underline hover:text-indigo-900 focus:text-indigo-900 focus:outline-none transition-colors "
            >
              {offer.artistName}
            </Link>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <p className="text-indigo-800 font-bold">Kategoria:</p>
              <p className="text-indigo-600 font-semibold">{offer.category}</p>
            </div>
            <div>
              <p className="text-indigo-800 font-bold">Temat:</p>
              <p className="text-indigo-600 font-semibold">{offer.topic}</p>
            </div>
            <div>
              <p className="text-indigo-800 font-bold">Technika:</p>
              <p className="text-indigo-600 font-semibold">{offer.technic}</p>
            </div>
            <div>
              <p className="text-indigo-800 font-bold">Wymiary:</p>
              <p className="text-indigo-600 font-semibold">
                {offer.dimensionsY}cm x {offer.dimensionsX}cm
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-indigo-800 font-bold">Tagi:</p>
              <p className="text-indigo-600 font-semibold">{offer.tags}</p>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <p className="text-indigo-800 font-bold">Opis produktu:</p>
            <p className="text-indigo-600 font-semibold">{offer.description}</p>
          </div>
          <div className="mb-4">
            <p className="text-indigo-800 font-bold">Cena:</p>
            <p className="text-indigo-600 font-semibold">{offer.price} zł</p>
          </div>
          {offer.archived ? (
            <button
              className="py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none transition-colors opacity-70"
              disabled
            >
              Produkt niedostępny
            </button>
          ) : (
            <button className="py-2 px-6 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none transition-colors">
              Dodaj do koszyka
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OfferDetails;
