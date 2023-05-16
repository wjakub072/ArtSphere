import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categories, topics, technics } from "../../data/artStaticData";
import GenericComboImput from "../Inputs/GenericComboInput";
import PriceInput from "../Inputs/PriceInput";
import DimensionsInput from "../Inputs/DimentionsInput";
import TitleInput from "../Inputs/TitleInput";
import AddImage from "../Inputs/AddImage";
import TagInput from "../Inputs/TagInput";
import Description from "../Inputs/Description";
import AuthContext from "../../context/AuthContext";
import axiosInstace from "../../api/axiosInstance";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import EditArtButton from "../Inputs/EditArtButton";
import Loading from "../Loading/Loading";

function EditArt() {
  useWebsiteTitle("Edycja Dzieła");
  const { errorResponseHandler, responseSuccess, setResponseSuccess } =
    useContext(AuthContext);

  const { artId } = useParams();
  const [loading, setLoading] = useState(true);

  const [validateError, setValidateError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [artData, setArtData] = useState(null);

  useEffect(() => {
    getOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setResponseSuccess("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOffer = async () => {
    try {
      const offerData = await axiosInstace.get(`offers/${artId}`);
      console.log(offerData.data);
      setArtData(offerData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editOffer = async (data) => {
    try {
      setLoadingButton(true);
      const response = await axiosInstace.post(`offers/${artId}`, data, {
        withCredentials: true,
      });
      console.log("respons edycji oferty");
      console.log(response);
      setResponseSuccess("Ofera została zakutalizowana");
    } catch (err) {
      setLoadingButton(false);
      errorResponseHandler(err);
    } finally {
      setLoadingButton(false);
    }
  };

  const clickHandle = () => {
    if (
      !(artData.photo === "") &&
      !(artData.photo === null) &&
      !(artData.photo === undefined) &&
      !(artData.category === "") &&
      !(artData.topic === "") &&
      !(artData.technic === "") &&
      !(artData.category === "-") &&
      !(artData.topic === "-") &&
      !(artData.technic === "-") &&
      !(artData.title === "") &&
      !(artData.description === "") &&
      !(artData.price === 0) &&
      !(artData.dimensionsY === 0) &&
      !(artData.dimensionsX === 0)
    ) {
      const data = {
        category: artData.category,
        technic: artData.technic,
        topic: artData.topic,
        title: artData.title,
        description: artData.description,
        price: artData.price,
        DimensionsX: artData.dimensionsX,
        DimensionsY: artData.dimensionsY,
        unit: "cm",
        picture: artData.photo,
        tags: artData.tags,
      };
      setValidateError("");
      editOffer(data);
    } else {
      setValidateError("Wypełnij wszystkie pola");
    }
  };

  return (
    <div className="w-full text-center mx-auto">
      <h2 className="mb-3 text-4xl text-indigo-600 font-semibold tracking-wider">
        Edycja dzieła
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <AddImage
            value={artData.photo}
            onChange={(val) => setArtData({ ...artData, photo: val })}
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
                  value={artData.category}
                  onChange={(val) =>
                    setArtData({ ...artData, category: val.name })
                  }
                />
              </div>
              <div className="mb-3 p-0.5">
                <GenericComboImput
                  title="Tematyka"
                  list={topics}
                  value={artData.topic}
                  onChange={(val) =>
                    setArtData({ ...artData, topic: val.name })
                  }
                />
              </div>
              <div className="mb-3 p-0.5">
                <GenericComboImput
                  title="Technika"
                  list={technics}
                  value={artData.technic}
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
                  value={artData.dimensionsY}
                  onChange={(val) =>
                    setArtData({ ...artData, dimensionsY: val })
                  }
                />
              </div>
              <div className="mb-3 p-0.5">
                <DimensionsInput
                  title="Szerokość"
                  value={artData.dimensionsX}
                  onChange={(val) =>
                    setArtData({ ...artData, dimensionsX: val })
                  }
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
            <EditArtButton
              title="Edytuj dzieło"
              onClick={clickHandle}
              loading={loadingButton}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditArt;
