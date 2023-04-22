<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
import DisplayFiltersButton from "../../components/Filters/DisplayFiltersButton";
import Filters from "../../components/Filters/Filters";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import offer_card from "../../data/offerData";
import "./gallery.css";
<<<<<<< HEAD
import OfferDetails from "../../components/OfferDetails/OfferDetails";
import EditArt from "../../components/EditArt/EditArt";
import AuthContext from "../../context/AuthContext";

function Gallery(props) {
  useWebsiteTitle("Galeria");
  const { setSesionError } = useContext(AuthContext);

  useEffect(() => {
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

=======

function Gallery(props) {
  useWebsiteTitle("Galeria");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
  const [showFilters, setShowFilters] = useState(false);
  const handleClick = () => {
    setShowFilters(!showFilters);
  };
<<<<<<< HEAD

  //tworzenie divy z ofertami
  const listItems = offer_card.map((item) => (
    <div className="offer_card" key={item.id}>
      <div className="offer_card_image">
        <img src={item.thumb} alt=" " />
      </div>
      <div className="offer_card_name">
        <h3>{item.name}</h3>
        <p className="offer_card_name_author">{item.author}</p>
        <p>{item.price} zł</p>
      </div>
    </div>
  ));
=======
  console.log(offer_card);

  //tworzenie divy z ofertami
  const listItems = offer_card.map((item) =>
    <div className="offer_card" key={item.id}>
            <div className="offer_card_image">
              <img src={item.thumb} alt=" "/>
            </div>
            <div className="offer_card_name">
              <h3>{item.name}</h3>
              <p className="offer_card_name_author">{item.author}</p>
              <p>{item.price} zł</p>
            </div>
    </div>
  )
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

  return (
    <div className="gallery">
      <DisplayFiltersButton
        className="DisplayFiltersButton"
        onClick={handleClick}
      />
      <div className="filters-container">
        <div className={`filters ${showFilters ? "show" : ""}`}>
          <Filters />
        </div>
      </div>
<<<<<<< HEAD
      <div className="offers-container">
        <div className="offers">
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
          <div className="offer_card_view">{listItems}</div>
        </div>
      </div>

=======

      <div className="offers-container">
        <div className="offers">
          <div className="offer_card_view">
            {listItems}
          </div>
        </div>
      </div>
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    </div>
  );
}

export default Gallery;
