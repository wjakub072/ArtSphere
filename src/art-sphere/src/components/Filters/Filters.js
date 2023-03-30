import { useState } from 'react';
import './filters.css';
import ArtistCombo from './Inputs/ArtistsCombo'
import GenericComboImput from './Inputs/GenericComboInput';

function Filters(props) {
    const [filters, setFilters] = useState({
        category: '',
        topic: '',
        technic: '',
        title: '',
        author: '',
        price_min: 0,
        price_max: 9999
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

    function handleFilterChange(newFilters) {
        setFilters(newFilters);
        props.onFilterChange(newFilters);
    }

    return (
        <div className="container">
            <ArtistCombo people={my_people} className='test'/>
            <GenericComboImput title='Kategorie' list={possible_categories}/>
            <GenericComboImput title='Tematy' list={possible_topics}/>
            <GenericComboImput title='Techniki' list={possible_topics}/>
        </div>
    );
}

export default Filters;