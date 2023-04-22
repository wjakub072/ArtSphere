import { useState } from "react";
import GenericComboImput from "./Inputs/GenericComboInput";
import PriceInput from "./Inputs/PriceInput";
import DimensionsInput from "./Inputs/DimentionsInput";
<<<<<<< HEAD
=======
import ArtistInput from "./Inputs/ArtistInput";
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
import TitleInput from "./Inputs/TitleInput";
import "./addArt.css";
import AddArtButton from "./Inputs/AddArtButton";
import AddImage from "./Inputs/AddImage";
<<<<<<< HEAD
import TagInput from "./Inputs/TagInput";
import Description from "./Inputs/Description";
=======
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

function AddArt() {
  const [showAddForm, setShowAddForm] = useState(false);
  const handleClick = () => {
    setShowAddForm(!showAddForm);
  };

<<<<<<< HEAD
  const [validateError, setValidateError] = useState("");

  const [artData, setArtData] = useState({
    img: "",
=======
  const [filters, setFilters] = useState({
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
    category: "",
    topic: "",
    technic: "",
    title: "",
<<<<<<< HEAD
    description: "",
=======
    author: "",
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
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

<<<<<<< HEAD
  const clickHandle = () => {
    if (
      !(artData.img === "") &&
      !(artData.img === null) &&
      !(artData.img === undefined) &&
      !(artData.category === "") &&
      !(artData.topic === "") &&
      !(artData.technic === "") &&
      !(artData.category === "-") &&
      !(artData.topic === "-") &&
      !(artData.technic === "-") &&
      !(artData.title === "") &&
      !(artData.description === "") &&
      !(artData.price === 0) &&
      !(artData.height === 0) &&
      !(artData.width === 0)
    ) {
      console.log(artData);
      setValidateError("");
    } else {
      setValidateError("Wypełnij wszystkie pola");
    }
  };
=======
  function handleFilterChange(newFilterValus) {
    console.log(newFilterValus);
    setFilters({ ...filters, price: newFilterValus });
    //props.onFilterChange(newFilters);
  }
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

  return (
    <>
      <div>
        <button onClick={handleClick}>Dodaj Dzieło</button>
      </div>
      <div className={`container add-art ${showAddForm ? "show" : ""}`}>
        <div className="col-sub">
<<<<<<< HEAD
          <AddImage
            value={artData.img}
            onChange={(val) => setArtData({ ...artData, img: val })}
          />
        </div>
        <div className="col">
          <div className="row">
            <GenericComboImput
              title="Kategoria"
              list={possible_categories}
              onChange={(val) => setArtData({ ...artData, category: val.name })}
            />
          </div>
          <div className="row">
            <GenericComboImput
              title="Tematyka"
              list={possible_topics}
              onChange={(val) => setArtData({ ...artData, topic: val.name })}
            />
          </div>
          <div className="row">
            <GenericComboImput
              title="Technika"
              list={possible_technics}
              onChange={(val) => setArtData({ ...artData, technic: val.name })}
            />
=======
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
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
          </div>
          <div className="row">
            <DimensionsInput
              title="Wysokość"
<<<<<<< HEAD
              value={artData.height}
              onChange={(val) => setArtData({ ...artData, height: val })}
=======
              value={filters.height}
              onChange={handleFilterChange}
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
            />
          </div>
        </div>
        <div className="col">
          <div className="row">
<<<<<<< HEAD
            <TitleInput
              value={artData.title}
              onChange={(val) => setArtData({ ...artData, title: val })}
            />
          </div>
          <div className="row">
            <PriceInput
              title="Cena"
              value={artData.price}
              onChange={(val) => setArtData({ ...artData, price: val })}
            />
=======
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
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
          </div>
          <div className="row">
            <DimensionsInput
              title="Szerokość"
<<<<<<< HEAD
              value={artData.width}
              onChange={(val) => setArtData({ ...artData, width: val })}
            />
            <Description
              value={artData.description}
              onChange={(val) => setArtData({ ...artData, description: val })}
            />
          </div>
        </div>
        <div className="col">
          <TagInput />
        </div>
        <div className="col-sub mt-3">
          {validateError && (
            <div className="text-danger text-center mb-4">{validateError}</div>
          )}
          <AddArtButton title="Dodaj dzieło" onClick={clickHandle} />
=======
              value={filters.width}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="col-sub">
          <AddArtButton title="Dodaj dzieło" />
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default AddArt;
