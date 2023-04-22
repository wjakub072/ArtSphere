<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import AuthContext from "../../context/AuthContext";

function Home(props) {
  useWebsiteTitle("Strona główna");
  const { setSesionError } = useContext(AuthContext);

  useEffect(() => {
    setSesionError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
=======
import React from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

function Home(props) {
  useWebsiteTitle("Strona główna");
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca

  return <h2>To będzię główna strona</h2>;
}

export default Home;
