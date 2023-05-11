import "./filters.css";

function DisplayFiltersButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>Show Filters</button>
    </div>
  );
}

export default DisplayFiltersButton;
