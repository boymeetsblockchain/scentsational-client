"use client";

import { useState } from "react";

export const SearchInput = () => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img src="/icons/search.svg" alt="" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Hey what are you looking for ?"
          className="w-full pl-10 pr-10 py-3 text-brand-black bg-white border border-brand-grey rounded-2xl focus:ring-2  focus:border-transparent outline-none transition-all"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
