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

  return <h2>To będzię główna strona</h2>;
}

export default Home;
