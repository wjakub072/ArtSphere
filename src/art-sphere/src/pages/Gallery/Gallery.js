import useWebsiteTitle from "../../hooks/useWebsiteTitle"
import Filters from "../../components/Filters/Filters";
import React from "react";

function Gallery(props) {
  useWebsiteTitle('Galeria');
  return (
    <div className="filters">
      <Filters/>
    </div>
  );
}

export default Gallery;