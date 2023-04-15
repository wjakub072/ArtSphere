import React, { useState } from "react";
import DisplayFiltersButton from "../../components/Filters/DisplayFiltersButton";
import Filters from "../../components/Filters/Filters";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import offer_card from "../../data/offerData";
import "./gallery.css";

function Gallery(props) {
  useWebsiteTitle("Galeria");
  const [showFilters, setShowFilters] = useState(false);
  const handleClick = () => {
    setShowFilters(!showFilters);
  };

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
        </div>
      </div>
    </div>
  );
}

export default Gallery;
