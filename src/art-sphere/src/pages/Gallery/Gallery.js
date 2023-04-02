import React, { useState } from 'react';
import DisplayFiltersButton from '../../components/Filters/DisplayFiltersButton';
import Filters from '../../components/Filters/Filters';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import "./gallery.css"

function Gallery(props) {
  useWebsiteTitle('Galeria');
  const [showFilters, setShowFilters] = useState(false);
  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className='gallery'>
      <DisplayFiltersButton className='DisplayFiltersButton' onClick={handleClick}/>
      <div className='filters-container'>
        <div className={`filters ${showFilters ? "show" : ""}`}>
          <Filters />
        </div>
      </div>
    </div>

  );
}

export default Gallery;