import React from "react";
import { useParams } from "react-router-dom";
import offer_card from "../../../data/offerData";

function OfferDetails() {
  const { offerId } = useParams();
  console.log(offerId);

  const offer = offer_card.find((offer) => offer.id === parseInt(offerId));
  console.log(offer);
  return (
    <div className="container flex bg-dark-subtle rounded-3 mt-5 p-3">
      <div className="w-1/2 pr-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-white bg-black rounded p-4 opacity-75">
          {offer.name}
        </h1>
        <img
          src={offer.thumb}
          alt="Zdjęcie produktu"
          className="w-full h-auto rounded"
        />
      </div>
      <div className="w-1/2">
        <div className="mb-4">
          <p className="text-gray-600 font-semibold">Autor:</p>
          <p className="text-black">{offer.author}</p>
        </div>
        <div className="flex">
          <div className="mb-4 w-1/3">
            <p className="text-gray-600 font-semibold">Kategoria:</p>
            <p className="text-black">{offer.category}</p>
          </div>
          <div className="mb-4 w-1/3">
            <p className="text-gray-600 font-semibold">Temat:</p>
            <p className="text-black">{offer.topic}</p>
          </div>
        </div>
        <div className="flex 2-2/3">
          <div className="mb-4 w-1/3">
            <p className="text-gray-600 font-semibold">Technika:</p>
            <p className="text-black">{offer.technic}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-semibold">Wymiary:</p>
            <p className="text-black">
              {offer.height} cm x {offer.width} cm
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold">Tagi:</p>
          <p className="text-black">{offer.tags}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold">Opis produktu:</p>
          <p className="text-black">{offer.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 font-semibold">Cena:</p>
          <p className="text-black font-semibold">{offer.price} zł</p>
        </div>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}

export default OfferDetails;
