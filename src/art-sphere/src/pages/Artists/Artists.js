import React from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle"

function Artists(props) {
  useWebsiteTitle('Artyści');

  return (
    <h2 >Tu będą się wyświetlali artyści</h2>
  );
}

export default Artists;