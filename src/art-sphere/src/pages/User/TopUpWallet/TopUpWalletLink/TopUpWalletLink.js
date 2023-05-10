import useWebsiteTitle from "../../../../hooks/useWebsiteTitle";
import React, { useState } from "react";

const TopUpWalletLink = () => {
  useWebsiteTitle("Doładowanie Portfela");

  return (
    <div className="text-4xl text-center mt-20 w-100">
        <form className="top-up-wallet-link-form">
            <h2 className="text-blue-600">Wpisz kwotę</h2>
            <div className="mt-2 relative rounded-md shadow-sm">
              <input
                type="number"
                min="0"
                className="form-input rounded-md block w-full py-2 pl-4 sm:text-xl sm:leading-5" placeholder="0.00"/>
              <div className="absolute inset-y-0 right-0 mr-14 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">PLN</span>
              </div>
            </div>
        </form>

        <button className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white my-3 py-2 px-4 rounded disabled:opacity-50">
            Doładuj portfel
        </button>
    </div>
  );
};

export default TopUpWalletLink;
