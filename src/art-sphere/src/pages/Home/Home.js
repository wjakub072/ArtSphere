import React from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

function Home(props) {
  useWebsiteTitle("Strona główna");

  return <h2>To będzię główna strona</h2>;
}

export default Home;
