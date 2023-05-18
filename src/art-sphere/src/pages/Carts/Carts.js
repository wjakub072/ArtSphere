import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrashOutline } from "heroicons-react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axiosInstace from "../../api/axiosInstance";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";

function Carts() {
  useWebsiteTitle("Koszyk");
  const { setSesionError } = useContext(AuthContext);

  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setSesionError("");
    getOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOffers = async () => {
    try {
      const getOfferList = await axiosInstace.get("offers");
      console.log(getOfferList.data);
      setOfferList(getOfferList.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteButton = async (id) => {
    console.log(id);
  };
  const handleButton = () => {
    navigate("/koszyk/platnosc");
  };

  return (
    <div className="px-5 flex flex-col-reverse lg:flex-row w-full xl:w-5/6 xl:mx-auto lg:gap-6">
      <section className="mt-5 bg-zinc-200 rounded-lg p-6 shadow-lg lg:w-3/4">
        {loading ? (
          <div className="my-3 w-48 h-48 mx-auto">
            <Loading />
          </div>
        ) : (
          offerList.map((item) => (
            <div
              className="md:flex bg-white p-6 rounded-lg mb-5 shadow-lg"
              key={item.id}
            >
              <div className="md:w-1/4 h-28 mx-auto mb-3 md:mb-0 md:mx-0">
                <img
                  className="w-full max-w-full max-h-full h-full object-contain object-center block"
                  src={item.photo}
                  alt={item.title}
                />
              </div>
              <div className="relative xl:flex justify-between items-center w-full md:pl-10 md:pr-16">
                <div>
                  <div className="text-xl font-bold tracking-wider p-1 text-indigo-600">
                    Temat:
                    <Link
                      to={`/galeria/${item.id}`}
                      className="underline hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md p-1 border-transparent focus:border-indigo-800"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="text-base font-semibold tracking-wide p-1 text-indigo-600">
                    Autor:
                    <Link
                      to={`/artysci/${item.artistId}`}
                      className="underline hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md p-1 border-transparent focus:border-indigo-800"
                    >
                      {item.artistName}
                    </Link>
                  </div>
                </div>
                <div className="relative font-medium text-indigo-600 xl:px-2">
                  <div className="border-2 border-transparent">
                    Cena: {item.price} PLN
                  </div>
                  <div className="hidden xl:block absolute top-0 right-0 px-2 translate-x-full">
                    <button
                      onClick={() => handleDeleteButton(item.id)}
                      className="hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md border-transparent focus:border-indigo-800"
                    >
                      <TrashOutline />
                    </button>
                  </div>
                </div>
                <div className="xl:hidden absolute top-0 right-5">
                  <button
                    onClick={() => handleDeleteButton(item.id)}
                    className="translate-x-full text-indigo-600 hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md border-transparent focus:border-indigo-800"
                  >
                    <TrashOutline />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
      <section className="mt-5 bg-zinc-200 rounded-lg p-6 shadow-lg h-fit lg:w-1/4">
        {loading ? (
          <div className="my-3 w-28 h-28 mx-auto">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex justify-between font-bold text-indigo-600">
              <div>Do zapłaty:</div>
              <div className="text-right">
                <p className="leading-3">1232412441 PLN</p>
                <p className="text-sm text-indigo-500 font-semibold">
                  +darmowa dostawa
                </p>
              </div>
            </div>
            <button
              onClick={handleButton}
              className="w-full py-2 mt-4 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-800 focus:bg-indigo-800 border-2 border-transparent focus:outline-none focus:border-indigo-400 transition-colors"
            >
              Płatność i dostawa
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export default Carts;
