import React, { useState } from "react";
import { categories, topics, technics } from "../../data/artStaticData";
import GenericComboImput from "../Inputs/GenericComboInput";
import PriceInput from "../Inputs/PriceInput";
import DimensionsInput from "../Inputs/DimentionsInput";
import ArtistSearchBox from "../Inputs/ArtistSearchbox";
import TitleSearchbox from "../Inputs/TitleSearchbox";
import SearchButton from "./SearchButton";
import ClearButton from "./ClearButton";

function Filters(props) {
  const [filters, setFilters] = useState({
    category: "",
    topic: "",
    technic: "",
    title: "",
    author: "",
    price_min: 0,
    price_max: 9999,
    height_min: 0,
    height_max: 9999,
    width_min: 0,
    width_max: 9999,
  });

  return (
    <>
      <div className="px-5 sm:px-20 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100">
        <div className="sm:col-span-2 lg:col-span-1">
          <GenericComboImput
            title="Kategorie"
            list={categories}
            onChange={(val) => setFilters({ ...filters, category: val.name })}
          />
        </div>
        <div>
          <GenericComboImput
            title="Tematyka"
            list={topics}
            onChange={(val) => setFilters({ ...filters, topic: val.name })}
          />
        </div>
        <div>
          <GenericComboImput
            title="Techniki"
            list={technics}
            onChange={(val) => setFilters({ ...filters, technic: val.name })}
          />
        </div>

        <div className="lg:col-span-2">
          <TitleSearchbox
            value={filters.title}
            onChange={(val) => setFilters({ ...filters, title: val })}
          />
        </div>
        <div>
          <ArtistSearchBox
            value={filters.author}
            onChange={(val) => setFilters({ ...filters, author: val })}
          />
        </div>
        <div>
          <span className="text-indigo-600 font-bold">Cena</span>
          <div>
            <div className="mb-3">
              <PriceInput
                title="Minimum"
                label={"CenaMinimum"}
                value={filters.price_min}
                onChange={(val) => setFilters({ ...filters, price_min: val })}
              />
            </div>
            <div>
              <PriceInput
                title="Maximum"
                label={"CenaMaximum"}
                value={filters.price_max}
                onChange={(val) => setFilters({ ...filters, price_max: val })}
              />
            </div>
          </div>
        </div>

        <div>
          <span className="text-indigo-600 font-bold">Wysokość</span>
          <div>
            <div className="mb-3">
              <DimensionsInput
                title="Minimum"
                label={"MinimumY"}
                value={filters.height_min}
                onChange={(val) => setFilters({ ...filters, height_min: val })}
              />
            </div>
            <div>
              <DimensionsInput
                title="Maximum"
                label={"MaximumY"}
                value={filters.height_max}
                onChange={(val) => setFilters({ ...filters, height_max: val })}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <span className="text-indigo-600 font-bold">Szerokość</span>
          <div className="sm:grid grid-cols-2 gap-4 lg:block">
            <div className="mb-3">
              <DimensionsInput
                title="Minimum"
                label={"MinimumX"}
                value={filters.width_min}
                onChange={(val) => setFilters({ ...filters, width_min: val })}
              />
            </div>
            <div>
              <DimensionsInput
                title="Maximum"
                label={"MaximumX"}
                value={filters.width_max}
                onChange={(val) => setFilters({ ...filters, width_max: val })}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block"></div>
        <div>
          <SearchButton title="Filtruj" />
        </div>

        <div>
          <ClearButton title="Wyczyść filtry" />
        </div>
      </div>
    </>
  );
}

export default Filters;
