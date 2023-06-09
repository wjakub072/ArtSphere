import { useContext, useEffect, useState } from "react";
import { TrashOutline } from "heroicons-react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import axiosInstace from "../../../api/axiosInstance";
import AuthContext from "../../../context/AuthContext";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ShoppingHistory = () => {
  useWebsiteTitle("Moje zakupy");
  const { errorResponseHandler } = useContext(AuthContext);

  const [offerList, setOfferList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrders = async () => {
    try {
      const getOrderList = await axiosInstace.get("profile/orders", {
        withCredentials: true,
      });
      console.log(getOrderList.data);
      setOfferList(getOrderList.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      errorResponseHandler(err);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      const deleteOrder = await axiosInstace.delete(`profile/orders/${id}`, {
        withCredentials: true,
      });

      const getOrderList = await axiosInstace.get("profile/orders", {
        withCredentials: true,
      });
      console.log(getOrderList.data);
      setOfferList(getOrderList.data);
      console.log(deleteOrder.data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
      errorResponseHandler(err);
    }
  };

  return (
    <div className="w-full lg:px-16 mx-auto">
      <h2 className="mb-5 text-4xl text-center text-indigo-600 font-semibold tracking-wider">
        Moje zakupy
      </h2>
      {loading ? (
        <div className="my-3 w-48 h-48 mx-auto">
          <Loading />
        </div>
      ) : offerList[0] ? (
        offerList.map((item) => (
          <div
            className="md:flex bg-white p-6 rounded-lg mb-5 shadow-lg"
            key={item.orderId}
          >
            <div className="w-2/12 text-indigo-600 font-bold justify-center md:flex items-center">
              <Link
                to={`${item.orderId}`}
                className="flex underline border-2 border-transparent rounded-md focus:border-indigo-800 hover:text-indigo-800 focus:outline-none focus:text-indigo-800 p-0.5"
              >
                ID: <p>{item.orderId}</p>
              </Link>
            </div>
            <div className="relative xl:flex justify-between items-center w-full md:pl-10 md:pr-16">
              <div>
                <div className="text-xl font-bold tracking-wider p-1 text-indigo-600">
                  Cena: {item.amount} PLN
                </div>
                <div className="text-base font-semibold tracking-wide p-1 text-indigo-600">
                  Data zakupu:{" "}
                  {new Date(item.executionTime).toLocaleString("pl-PL", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="relative font-medium text-indigo-600 xl:px-2">
                <div className="border-2 border-transparent p-0.5 xl:p-0">
                  Status: {item.status}
                </div>
                <div className="hidden xl:block absolute top-0 right-0 px-2 translate-x-full">
                  <button
                    onClick={() => handleDeleteButton(item.orderId)}
                    className="hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md border-transparent focus:border-indigo-800"
                  >
                    <TrashOutline />
                  </button>
                </div>
              </div>
              <div className="xl:hidden absolute top-0 right-5">
                <button
                  onClick={() => handleDeleteButton(item.orderId)}
                  className="translate-x-full text-indigo-600 hover:text-indigo-800 focus:outline-none focus:text-indigo-800 border-2 rounded-md border-transparent focus:border-indigo-800"
                >
                  <TrashOutline />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-center text-2xl font-bold text-indigo-600 tracking-wider">
          Nie dokonano jeszcze żadnych zakupów
        </h3>
      )}
    </div>
  );
};

export default ShoppingHistory;
