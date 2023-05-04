import { useContext, useState } from "react";
import GenericComboImput from "./Inputs/GenericComboInput";
import PriceInput from "./Inputs/PriceInput";
import DimensionsInput from "./Inputs/DimentionsInput";
import TitleInput from "./Inputs/TitleInput";
import AddArtButton from "./Inputs/AddArtButton";
import AddImage from "./Inputs/AddImage";
import TagInput from "./Inputs/TagInput";
import Description from "./Inputs/Description";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./addArt.css";

function AddArt() {
  const { errorResponseHandler, setResponseSuccess, setResponseError } =
    useContext(AuthContext);

  const [showAddForm, setShowAddForm] = useState(false);
  const handleClick = () => {
    setShowAddForm(!showAddForm);
  };

  const [validateError, setValidateError] = useState("");
  const [dataResponse, setDataResponse] = useState("");
  const [artData, setArtData] = useState({
    img: "",
    category: "",
    topic: "",
    technic: "",
    title: "",
    description: "",
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

  const addArt = async (data) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5006/api/offers",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("respons dodania dzieła");
      console.log(response);
      setResponseSuccess("Dzieło zostało dodane");
    } catch (err) {
      if (err.response) {
        setResponseSuccess("");
        setResponseError(err.response.data.message);
      }
      console.log(err);
      errorResponseHandler(err);
    }
  };

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
      const data = {
        category: artData.category,
        technic: artData.technic,
        topic: artData.topic,
        title: artData.title,
        description: artData.description,
        price: artData.price,
        DimensionsX: artData.width,
        DimensionsY: artData.height,
        unit: "cm",
        picture: artData.img,
      };
      setValidateError("");
      addArt(data);
    } else {
      setValidateError("Wypełnij wszystkie pola");
    }
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Dodaj Dzieło</button>
      </div>
      <div className={`add-art ${showAddForm ? "show" : ""}`}>
        <AddImage
          value={artData.img}
          onChange={(val) => setArtData({ ...artData, img: val })}
        />

        <TitleInput
          value={artData.title}
          onChange={(val) => setArtData({ ...artData, title: val })}
        />
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
          <div>
            <div className=""></div>
            <div className="">
              <GenericComboImput
                title="Kategoria"
                list={possible_categories}
                onChange={(val) =>
                  setArtData({ ...artData, category: val.name })
                }
              />
            </div>
            <div className="">
              <GenericComboImput
                title="Tematyka"
                list={possible_topics}
                onChange={(val) => setArtData({ ...artData, topic: val.name })}
              />
            </div>
            <div className="">
              <GenericComboImput
                title="Technika"
                list={possible_technics}
                onChange={(val) =>
                  setArtData({ ...artData, technic: val.name })
                }
              />
            </div>
          </div>
          <div>
            <div className="">
              <PriceInput
                title="Cena"
                value={artData.price}
                onChange={(val) => setArtData({ ...artData, price: val })}
              />
            </div>
            <div className="">
              <DimensionsInput
                title="Wysokość"
                value={artData.height}
                onChange={(val) => setArtData({ ...artData, height: val })}
              />
            </div>
            <div className="">
              <DimensionsInput
                title="Szerokość"
                value={artData.width}
                onChange={(val) => setArtData({ ...artData, width: val })}
              />
            </div>
          </div>
        </div>
        <Description
          value={artData.description}
          onChange={(val) => setArtData({ ...artData, description: val })}
        />

        <TagInput />
        {validateError && (
          <div className="text-danger text-center mb-4">{validateError}</div>
        )}
        <div className="mx-auto text-center">
          <AddArtButton title="Dodaj dzieło" onClick={clickHandle} />
        </div>
      </div>
    </>
  );
}

export default AddArt;
