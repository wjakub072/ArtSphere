import React from "react";
import { categories, topics, technics } from "../../data/artStaticData";
import GenericComboImput from "../Inputs/GenericComboInput";
import PriceInput from "../Inputs/PriceInput";
import DimensionsInput from "../Inputs/DimentionsInput";
import ArtistSearchBox from "../Inputs/ArtistSearchbox";
import TitleSearchbox from "../Inputs/TitleSearchbox";
import SearchButton from "./SearchButton";
import ClearButton from "./ClearButton";
import TagSearchbox from "../Inputs/TagSearchbox";
import FiltersCheckbox from "../Inputs/FiltersCheckbox";

function Filters(props) {
  return (
    <>
      <div className="px-5 sm:px-20 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100">
        <div className="sm:col-span-2 lg:col-span-1">
          <GenericComboImput
            title="Kategorie"
            list={categories}
            value={props.filters.category}
            onChange={(val) => {
              props.getFilters({ ...props.filters, category: val.name });
            }}
          />
        </div>
        <div>
          <GenericComboImput
            title="Tematyka"
            list={topics}
            value={props.filters.topic}
            onChange={(val) => {
              props.getFilters({ ...props.filters, topic: val.name });
            }}
          />
        </div>
        <div>
          <GenericComboImput
            title="Techniki"
            list={technics}
            value={props.filters.technic}
            onChange={(val) => {
              props.getFilters({ ...props.filters, technic: val.name });
            }}
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <TitleSearchbox
            value={props.filters.title}
            onChange={(val) => {
              props.getFilters({ ...props.filters, title: val });
            }}
          />
        </div>
        <div>
          <ArtistSearchBox
            value={props.filters.artist}
            onChange={(val) => {
              props.getFilters({ ...props.filters, artist: val });
            }}
          />
        </div>
        <div>
          <TagSearchbox
            value={props.filters.tags}
            onChange={(val) => {
              props.getFilters({ ...props.filters, tags: val });
            }}
          />
        </div>
        <div>
          <span className="text-indigo-600 font-bold">Cena</span>
          <div>
            <div className="mb-3">
              <PriceInput
                title="Minimum"
                label={"CenaMinimum"}
                value={props.filters.priceBottom}
                onChange={(val) => {
                  props.getFilters({ ...props.filters, priceBottom: val });
                }}
              />
            </div>
            <div>
              <PriceInput
                title="Maximum"
                label={"CenaMaximum"}
                value={props.filters.priceTop}
                onChange={(val) => {
                  props.getFilters({ ...props.filters, priceTop: val });
                }}
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
                value={props.filters.dimensionsYBottom}
                onChange={(val) => {
                  props.getFilters({
                    ...props.filters,
                    dimensionsYBottom: val,
                  });
                }}
              />
            </div>
            <div>
              <DimensionsInput
                title="Maximum"
                label={"MaximumY"}
                value={props.filters.dimensionsYTop}
                onChange={(val) => {
                  props.getFilters({ ...props.filters, dimensionsYTop: val });
                }}
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
                value={props.filters.dimensionsXBottom}
                onChange={(val) => {
                  props.getFilters({
                    ...props.filters,
                    dimensionsXBottom: val,
                  });
                }}
              />
            </div>
            <div>
              <DimensionsInput
                title="Maximum"
                label={"MaximumX"}
                value={props.filters.dimensionsXTop}
                onChange={(val) => {
                  props.getFilters({ ...props.filters, dimensionsXTop: val });
                }}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <FiltersCheckbox
            value={props.filters.includeSold}
            onChange={(val) => {
              props.getFilters({
                ...props.filters,
                includeSold: val,
                includeArchived: val,
              });
            }}
          />
        </div>
        <div>
          <SearchButton onClick={props.search} title="Filtruj" />
        </div>

        <div>
          <ClearButton onClick={props.clearFilters} title="Wyczyść filtry" />
        </div>
      </div>
    </>
  );
}

export default Filters;
