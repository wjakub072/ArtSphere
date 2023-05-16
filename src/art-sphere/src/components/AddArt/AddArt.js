import { useContext, useState } from "react";
import GenericComboImput from "../Inputs/GenericComboInput";
import PriceInput from "../Inputs/PriceInput";
import DimensionsInput from "../Inputs/DimentionsInput";
import TitleInput from "../Inputs/TitleInput";
import AddArtButton from "../Inputs/AddArtButton";
import AddImage from "../Inputs/AddImage";
import TagInput from "../Inputs/TagInput";
import Description from "../Inputs/Description";
import AuthContext from "../../context/AuthContext";
import axiosInstace from "../../api/axiosInstance";
import { categories, topics, technics } from "../../data/artStaticData";
import "./addArt.css";

function AddArt() {
  const {
    errorResponseHandler,
    responseSuccess,
    setResponseSuccess,
    setResponseError,
  } = useContext(AuthContext);

  const [showAddForm, setShowAddForm] = useState(false);
  const handleClick = () => {
    setShowAddForm(!showAddForm);
  };

  const [validateError, setValidateError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
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
    tags: [],
  });

  const addArt = async (data) => {
    try {
      setLoadingButton(true);
      let response = await axiosInstace.post("offers", data, {
        withCredentials: true,
      });
      console.log("respons dodania dzieła");
      console.log(response);
      setResponseSuccess("Dzieło zostało dodane");
    } catch (err) {
      setLoadingButton(false);
      if (err.response) {
        setResponseSuccess("");
        setResponseError(err.response.data.message);
      }
      console.log(err);
      errorResponseHandler(err);
    } finally {
      setLoadingButton(false);
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
        tags: artData.tags,
      };
      setValidateError("");
      setResponseSuccess("");
      addArt(data);
    } else {
      setValidateError("Wypełnij wszystkie pola");
    }
  };

  return (
    <>
      <div>
        <button
          className="flex gap-6 align-middle mx-auto text-white py-2 px-5 bg-indigo-600 border-2 rounded-md border-transparent focus:outline-none focus:border-indigo-400"
          onClick={handleClick}
        >
          Dodaj Dzieło
          <div
            className={`w-4 fill-white transition-transform duration-500 ${
              showAddForm && "rotate-180"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>
          </div>
        </button>
      </div>
      <div className={`add-art ${showAddForm ? "show" : ""}`}>
        <AddImage
          value={artData.img}
          onChange={(val) => setArtData({ ...artData, img: val })}
        />
        <div className="text-left mb-3 p-0.5">
          <TitleInput
            value={artData.title}
            onChange={(val) => setArtData({ ...artData, title: val })}
          />
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 text-left">
          <div>
            <div className="mb-3 p-0.5">
              <GenericComboImput
                title="Kategoria"
                list={categories}
                onChange={(val) =>
                  setArtData({ ...artData, category: val.name })
                }
              />
            </div>
            <div className="mb-3 p-0.5">
              <GenericComboImput
                title="Tematyka"
                list={topics}
                onChange={(val) => setArtData({ ...artData, topic: val.name })}
              />
            </div>
            <div className="mb-3 p-0.5">
              <GenericComboImput
                title="Technika"
                list={technics}
                onChange={(val) =>
                  setArtData({ ...artData, technic: val.name })
                }
              />
            </div>
          </div>
          <div>
            <div className="mb-3 p-0.5">
              <PriceInput
                title="Cena"
                value={artData.price}
                onChange={(val) => setArtData({ ...artData, price: val })}
              />
            </div>
            <div className="mb-3 p-0.5">
              <DimensionsInput
                title="Wysokość"
                value={artData.height}
                onChange={(val) => setArtData({ ...artData, height: val })}
              />
            </div>
            <div className="mb-3 p-0.5">
              <DimensionsInput
                title="Szerokość"
                value={artData.width}
                onChange={(val) => setArtData({ ...artData, width: val })}
              />
            </div>
          </div>
        </div>
        <div className="p-0.5">
          <Description
            title="Opis dzieła"
            value={artData.description}
            onChange={(val) => setArtData({ ...artData, description: val })}
          />
        </div>

        <div className="p-0.5">
          <TagInput
            prevTags={artData.tags}
            actualTags={(val) => setArtData({ ...artData, tags: val })}
          />
        </div>
        {validateError && (
          <div className="text-red-500 text-center my-3 font-medium">
            {validateError}
          </div>
        )}
        {responseSuccess && (
          <p className="text-green-800 text-center my-3 font-medium">
            {responseSuccess}
          </p>
        )}
        <div className="mx-auto mt-5 text-center p-0.5">
          <AddArtButton
            title="Dodaj dzieło"
            onClick={clickHandle}
            loading={loadingButton}
          />
        </div>
      </div>
    </>
  );
}

export default AddArt;
