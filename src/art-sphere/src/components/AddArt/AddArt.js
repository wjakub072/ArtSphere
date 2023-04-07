import { useState } from "react";
import GenericComboImput from "./Inputs/GenericComboInput";
import PriceInput from "./Inputs/PriceInput";
import DimensionsInput from "./Inputs/DimentionsInput";
import ArtistInput from "./Inputs/ArtistInput";
import TitleInput from "./Inputs/TitleInput";
import "./addArt.css";
import AddArtButton from "./Inputs/AddArtButton";
import AddImage from "./Inputs/AddImage";

function AddArt() {
  const [showAddForm, setShowAddForm] = useState(false);
  const handleClick = () => {
    setShowAddForm(!showAddForm);
  };

  const [filters, setFilters] = useState({
    category: "",
    topic: "",
    technic: "",
    title: "",
    author: "",
    price: 0,
    height: 0,
    width: 0,
  });

  const possible_categories = [
    {
      id: 1,
      name: "-",
    },
    {
      id: 2,
      name: "Obrazy",
    },
    {
      id: 3,
      name: "Grafika",
    },
    {
      id: 4,
      name: "Rzeźba",
    },
    {
      id: 5,
      name: "Zdjęcie",
    },
  ];
  const possible_topics = [
    {
      id: 1,
      name: "-",
    },
    {
      id: 2,
      name: "Abstrakcja",
    },
    {
      id: 3,
      name: "Architektura",
    },
    {
      id: 4,
      name: "Człowiek",
    },
    {
      id: 5,
      name: "Fantastyka",
    },
    {
      id: 6,
      name: "Geometria",
    },
    {
      id: 7,
      name: "Kwiaty",
    },
    {
      id: 8,
      name: "Martwa Natura",
    },
  ];
  const possible_technics = [
    {
      id: 1,
      name: "-",
    },
    {
      id: 2,
      name: "Akryl",
    },
    {
      id: 3,
      name: "Akwarela",
    },
    {
      id: 4,
      name: "Pastel",
    },
    {
      id: 5,
      name: "Węgiel",
    },
    {
      id: 6,
      name: "Tusz",
    },
    {
      id: 7,
      name: "Spray",
    },
    {
      id: 8,
      name: "Sitodruk",
    },
    {
      id: 9,
      name: "Olej",
    },
    {
      id: 10,
      name: "Ołówek",
    },
  ];

  function handleFilterChange(newFilterValus) {
    console.log(newFilterValus);
    setFilters({ ...filters, price: newFilterValus });
    //props.onFilterChange(newFilters);
  }

  return (
    <>
      <div>
        <button onClick={handleClick}>Dodaj Dzieło</button>
      </div>
      <div className={`container add-art ${showAddForm ? "show" : ""}`}>
        <div className="col-sub">
          <AddImage />
        </div>
        <div className="col">
          <div className="row">
            <GenericComboImput title="Kategorie" list={possible_categories} />
          </div>
          <div className="row">
            <GenericComboImput title="Tematy" list={possible_topics} />
          </div>
          <div className="row">
            <GenericComboImput title="Techniki" list={possible_technics} />
          </div>
          <div className="row">
            <DimensionsInput
              title="Wysokość"
              value={filters.height}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <PriceInput
              title="Cena"
              value={filters.price}
              onChange={handleFilterChange}
            />
          </div>
          <div className="row">
            <ArtistInput />
          </div>
          <div className="row">
            <TitleInput />
          </div>
          <div className="row">
            <DimensionsInput
              title="Szerokość"
              value={filters.width}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="col-sub">
          <AddArtButton title="Dodaj dzieło" />
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default AddArt;
