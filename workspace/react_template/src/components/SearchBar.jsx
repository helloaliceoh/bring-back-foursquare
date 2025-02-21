// src/components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query,
      priceFilter,
      ratingFilter
    });
  };

  const selectClass = "w-full sm:w-40 h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16BAC5] focus:border-transparent transition-colors hover:border-[#16BAC5]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants..."
          className="w-full sm:w-96 h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16BAC5] focus:border-transparent transition-colors hover:border-[#16BAC5]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto h-10 px-6 rounded-md bg-[#16BAC5] text-white font-medium hover:bg-opacity-90 transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Prices</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          className={selectClass}
        >
          <option value="0">All Ratings</option>
          <option value="7">7+ Rating</option>
          <option value="8">8+ Rating</option>
          <option value="9">9+ Rating</option>
        </select>
      </div>
    </form>
  );
}

export default SearchBar;