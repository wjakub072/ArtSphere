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
import DatePicker from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
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
  const [isAuction, setIsAuction] = useState(false);
  const [date, setDate] = useState(
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
  );

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
        isauction: isAuction,
        auctionEndTime: date.toISOString().split("T")[0],
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
            className={`w-4 fill-white transition-transform duration-700 rotate-180 ${
              showAddForm && "rotate-0"
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
        <div className="text-center mb-2 mt-4 p-0.5">
          <input
            className="w-4 h-4 accent-indigo-600 bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600 border-2 focus:outline-none focus:border-indigo-600 "
            value={isAuction}
            onChange={(e) => setIsAuction(e.target.checked)}
            type="checkbox"
            id="auction"
            name="auction"
          />
          <label
            className="text-indigo-600 px-2 pb-1 text-base font-medium"
            htmlFor="auction"
          >
            Czy wystawić na aukcję?
          </label>
        </div>
        {isAuction && (
          <div className="text-left mx-auto mb-3 p-0.5">
            <label>
              <p className="text-sm mb-1 font-medium leading-6 text-indigo-600">
                Data zakończenia aukcji
              </p>
              <DatePicker
                locale={pl}
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)}
                dateFormat="yyyy/MM/dd"
              />
            </label>
          </div>
        )}
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
                title={`Cena ${isAuction ? "wywoławcza" : ""}`}
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
