import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayFiltersButton from "../../components/Filters/DisplayFiltersButton";
import Filters from "../../components/Filters/Filters";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import offer_card from "../../data/offerData";
import AuthContext from "../../context/AuthContext";
import "./gallery.css";

function Gallery(props) {
  useWebsiteTitle("Galeria");
  const { setSesionError } = useContext(AuthContext);

  useEffect(() => {
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  //tworzenie divy z ofertami
  const listItems = offer_card.map((item) => (
    <Link to={`/galeria/${item.id}`}>
      <div className="offer_card rounded" key={item.id}>
        <div className="offer_card_image">
          <img src={item.thumb} alt="" className="rounded" />
        </div>
        <div className="offer_card_name">
          <h3>{item.name}</h3>
          <p className="offer_card_name_author">{item.author}</p>
          <p>{item.price} zł</p>
        </div>
      </div>
    </Link>
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
        <div className="offers">{listItems}</div>
      </div>
    </div>
  );
}

export default Gallery;
