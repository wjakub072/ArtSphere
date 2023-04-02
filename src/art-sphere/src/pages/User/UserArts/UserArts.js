import React from "react";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";

const UserArts = () => {
  useWebsiteTitle('Twoje dzieła');
  return (
    <div className="user-user-arts-wrap">
        <h2>Twoje dzieła</h2>
        <p>Bedzie jakaś tabela razem z API się zrobi</p>
    </div>
  );
}

export default UserArts;