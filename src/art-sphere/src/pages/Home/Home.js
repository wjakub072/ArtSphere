import React, { useContext, useEffect, useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";
import axiosInstace from "../../api/axiosInstance";

function Home(props) {
  useWebsiteTitle("Strona główna");
  const { setSesionError } = useContext(AuthContext);
  const [offerList, setOfferList] = useState(null);
  const [auctionList, setAuctionList] = useState(null);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingAuctions, setLoadingAuctions] = useState(true);

  useEffect(() => {
    setSesionError("");
    getOffers();
    getAuctions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOffers = async () => {
    try {
      const getOfferList = await axiosInstace.get("offers/latest", {
        params: { type: "offer", pageSize: 10, page: 1 },
      });
      console.log(getOfferList.data);
      setOfferList(getOfferList.data);
      setLoadingOffers(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getAuctions = async () => {
    try {
      const getAuctionsList = await axiosInstace.get("offers/latest", {
        params: { type: "auction", pageSize: 10, page: 1 },
      });
      console.log(getAuctionsList.data);
      setAuctionList(getAuctionsList.data);
      setLoadingAuctions(false);
    } catch (err) {
      console.log(err);
    }
  };

  return <h2>To będzię główna strona</h2>;
}

export default Home;
