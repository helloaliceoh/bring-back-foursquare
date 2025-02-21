// src/components/LocationInput.jsx
import React, { useState } from 'react';

function LocationInput({ onLocationSubmit }) {
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use OpenStreetMap Nominatim API to get coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      
      const data = await response.json();
      
      if (data && data[0]) {
        onLocationSubmit({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        });
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Could not find the specified city. Please try again.');
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-start max-w-xl">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name"
          required
          className="w-full sm:w-96 h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#16BAC5] focus:border-transparent transition-colors hover:border-[#16BAC5]"
        />
        <button
          type="submit"
          className="w-full sm:w-auto h-10 px-6 rounded-md bg-[#16BAC5] text-white font-medium hover:bg-opacity-90 transition-colors"
        >
          Set Location
        </button>
      </form>
    </div>
  );
}

export default LocationInput;