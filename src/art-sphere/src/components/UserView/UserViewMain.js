import React, { useState } from "react";
import './userViewMain.css';
import UserViewNav from "./UserViewNav/UserViewNav";
import Profile from "./Profile/Profile";
import ShoppingHistory from "./ShoppingHistory/ShoppingHistory";
import Favorite from "./Favorite/Favorite";
import TopUpWallet from "./TopUpWallet/TopUpWallet";
import DeliveryAddress from "./DeliveryAddress/DeliveryAddress";
import InvoiceData from "./InvoiceData/InvoiceData";
import AccountSettings from "./AccountSettings/AccountSettings";
import UserArts from "./UserArts/UserArts";
import AdminPanel from "./AdminPanel/AdminPanel";

function UserView() {
  const [active, setActive] = useState("Profile");
  return(
    <section className="user-view">
      <UserViewNav active={setActive}/>

      {active === "Profile" && <Profile />}
      {active === "ShoppingHistory" && <ShoppingHistory />}
      {active === "Favorite" && <Favorite />}
      {active === "TopUpWallet" && <TopUpWallet />}
      {active === "DeliveryAddress" && <DeliveryAddress />}
      {active === "InvoiceData" && <InvoiceData />}
      {active === "AccountSettings" && <AccountSettings />}
      {active === "UserArts" && <UserArts />}
      {active === "AdminPanel" && <AdminPanel />}

    </section>
  );
}

export default UserView;