function FiltersCheckbox(props) {
  const handleChange = (event) => {
    props.onChange(event.target.checked);
  };

  return (
    <div className="relative h-full">
      <div className="flex h-full items-center rounded-xl">
        <input
          id="isSold"
          name="isSold"
          type="checkbox"
          className="w-6 h-6 m-2 accent-indigo-600 bg-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600 border-2 focus:outline-none focus:border-indigo-600 "
          value={props.value}
          checked={props.value}
          onChange={handleChange}
        />
        <label
          htmlFor="isSold"
          className="block font-bold leading-6 text-indigo-600"
        >
          Wyświetl archiwalne
        </label>
      </div>
    </div>
  );
}

export default FiltersCheckbox;
