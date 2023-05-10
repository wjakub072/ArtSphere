import { useState } from "react";
import GenericComboImput from "./Inputs/GenericComboInput";
import PriceInput from "./Inputs/PriceInput";
import DimensionsInput from "./Inputs/DimentionsInput";
import TitleInput from "./Inputs/TitleInput";
import "./editArt.css";
import EditArtButton from "./Inputs/EditArtButton";
import AddImage from "./Inputs/AddImage";
import TagInput from "./Inputs/TagInput";
import Description from "./Inputs/Description";

function EditArt() {
  const [validateError, setValidateError] = useState("");

  const [artData, setArtData] = useState({
    img: "",
    category: "Obrazy",
    topic: "Abstrakcja",
    technic: "Akryl",
    title: "Jakiś tytuł",
    description: "Cześć jestem opisem",
    price: 214,
    height: 21,
    width: 21,
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

  return (
    <>
      <div className={`container`}>
        <div className="col-sub" style={{ width: "70%" }}>
          <AddImage
            value={artData.img}
            onChange={(val) => setArtData({ ...artData, img: val })}
          />
        </div>
        <div className="col">
          <div className="row">
            <GenericComboImput
              title="Kategoria"
              val={artData.category}
              list={possible_categories}
              onChange={(val) => setArtData({ ...artData, category: val.name })}
            />
          </div>
          <div className="row">
            <GenericComboImput
              title="Tematyka"
              val={artData.topic}
              list={possible_topics}
              onChange={(val) => setArtData({ ...artData, topic: val.name })}
            />
          </div>
          <div className="row">
            <GenericComboImput
              title="Technika"
              val={artData.technic}
              list={possible_technics}
              onChange={(val) => setArtData({ ...artData, technic: val.name })}
            />
          </div>
          <div className="row">
            <DimensionsInput
              title="Wysokość"
              value={artData.height}
              onChange={(val) => setArtData({ ...artData, height: val })}
            />
          </div>
        </div>
        <div className="col">
          <div className="row">
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
          </div>
          <div className="row">
            <DimensionsInput
              title="Szerokość"
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
        <div style={{ width: "70%", margin: "0 auto" }}>
          <div
            className="col-sub mt-3"
            style={{ width: "70%", margin: "0 auto" }}
          >
            {validateError && (
              <div className="text-danger text-center mb-4">
                {validateError}
              </div>
            )}
            <EditArtButton title="Dodaj dzieło" onClick={clickHandle} />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default EditArt;
