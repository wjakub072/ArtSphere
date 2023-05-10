function DisplayFiltersButton({ onClick, show }) {
  return (
    <div className="text-indigo-600 font-bold relative z-10 ">
      <button
        className="flex gap-2 align-middle rounded-md px-1 border-2 border-transparent focus:outline-none focus:border-indigo-600"
        onClick={onClick}
      >
        Pokaż filtry
        <div
          className={`w-4 fill-indigo-600 duration-700 transition-transform ${
            show && "rotate-180"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
          </svg>
        </div>
      </button>
    </div>
  );
}

export default DisplayFiltersButton;
