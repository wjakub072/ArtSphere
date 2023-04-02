import React, { useState } from 'react';
import './filters.css';
import GenericComboImput from './Inputs/GenericComboInput';
import PriceInput from './Inputs/PriceInput';
import DimensionsInput from './Inputs/DimentionsInput';
import ArtistSearchBox from './Inputs/ArtistSearchbox';
import TitleSearchbox from './Inputs/TitleSearchbox';

function Filters(props) {
    const [filters, setFilters] = useState({
        category: '',
        topic: '',
        technic: '',
        title: '',
        author: '',
        price_min: 0,
        price_max: 9999,
        height_min: 0,
        height_max:9999
      });

    const my_people = [
        {
          id: 1,
          name: 'Wade Cooper'
        },
        {
          id: 2,
          name: 'Arlene Mccoy'
        },
        {
          id: 3,
          name: 'Devon Webb'
        },
        {
          id: 4,
          name: 'Tom Cook'
        }
    ]
    const possible_categories = [
        {
          id: 1,
          name: '-'
        },
        {
          id: 2,
          name: 'Obrazy'
        },
        {
          id: 3,
          name: 'Grafika'
        },
        {
          id: 4,
          name: 'Rzeźba'
        },
        {
          id: 5,
          name: 'Zdjęcie'
        }
    ]
    const possible_topics = [
        {
            id: 1,
            name: '-'
        },
        {
            id: 2,
            name: 'Abstrakcja'
        },
        {
            id: 3,
            name: 'Architektura'
        },
        {
            id: 4,
            name: 'Człowiek'
        },
        {
            id: 5,
            name: 'Fantastyka'
        },
        {
            id: 6,
            name: 'Geometria'
        },
        {
            id: 7,
            name: 'Kwiaty'
        },
        {
            id: 8,
            name: 'Martwa Natura'
        },

    ]
    const possible_technics = [
      {
          id: 1,
          name: '-'
      },
      {
          id: 2,
          name: 'Akryl'
      },
      {
          id: 3,
          name: 'Akwarela'
      },
      {
          id: 4,
          name: 'Pastel'
      },
      {
          id: 5,
          name: 'Węgiel'
      },
      {
          id: 6,
          name: 'Tusz'
      },
      {
          id: 7,
          name: 'Spray'
      },
      {
          id: 8,
          name: 'Sitodruk'
      },
      {
          id: 9,
          name: 'Olej'
      },
      {
          id: 10,
          name: 'Ołówek'
      },
    ]
      
    function handleFilterChange(newFilters) {
        setFilters(newFilters);
        //props.onFilterChange(newFilters);
    }

    return (
        <div className="container">
          <div className='col'>
            <GenericComboImput title='Kategorie' list={possible_categories}/>
            <GenericComboImput title='Tematy' list={possible_topics}/>
            <GenericComboImput title='Techniki' list={possible_technics}/>
          </div>
          <div className='col'>
            <div className='row'>
            <span>Cena</span>
            <div className='two-part'>
                <div className='col-sub'>
                  <PriceInput title='Minimum' value={filters.price_min} onChange={handleFilterChange}/>
                </div>
                <div className='col-sub'>
                  <PriceInput title='Maximum' value={filters.price_max} onChange={handleFilterChange}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <ArtistSearchBox></ArtistSearchBox>
            </div>
            <div className='row'>
              <TitleSearchbox/>
            </div>
          </div>
          <div className='col'>
            <div className='row'>
              <span>Wysokość</span>
              <div className='two-part'>
                <div className='col-sub'>
                  <DimensionsInput title='Minimum' value={filters.height_min} onChange={handleFilterChange}/>
                </div>
                <div className='col-sub'>
                  <DimensionsInput title='Maximum' value={filters.height_max} onChange={handleFilterChange}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <span>Szerokość</span>
              <div className='two-part'>
                <div className='col-sub'>
                  <DimensionsInput title='Minimum' value={filters.height_min} onChange={handleFilterChange}/>
                </div>
                <div className='col-sub'>
                  <DimensionsInput title='Maximum' value={filters.height_max} onChange={handleFilterChange}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Filters;