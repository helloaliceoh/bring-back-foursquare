// src/App.jsx
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';
import LocationInput from './components/LocationInput';
import Map from './components/Map';
import ErrorMessage from './components/ErrorMessage';
import { searchRestaurants } from './api/foursquare';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSearch = async (searchParams) => {
    if (!userLocation) {
      setError('Please provide a location to search for restaurants');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { query, priceFilter, ratingFilter } = searchParams;
      const results = await searchRestaurants(
        query,
        userLocation.lat,
        userLocation.lng
      );

      // Filter results based on price and rating
      let filteredResults = results.results;
      
      if (priceFilter !== 'all') {
        filteredResults = filteredResults.filter(
          (restaurant) => restaurant.price === parseInt(priceFilter)
        );
      }

      if (ratingFilter > 0) {
        filteredResults = filteredResults.filter(
          (restaurant) => restaurant.rating >= ratingFilter
        );
      }

      setRestaurants(filteredResults);
      setSelectedRestaurant(null);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSubmit = (location) => {
    setUserLocation(location);
    setRestaurants([]);
    setError(null);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EA] flex flex-col">
      <header className="bg-[#F79256] shadow-sm flex-none">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl text-[#F7F4EA] font-['Pacifico']">
            Bring Foursquare Back
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
          {/* Search Controls - Fixed */}
          <div className="py-8">
            <LocationInput onLocationSubmit={handleLocationSubmit} />
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && <ErrorMessage message={error} />}
          </div>

          {/* Content Area - Flexible Height */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 pb-8">
            {/* Desktop: Left Column (Scrollable) / Mobile: Top */}
            <div className="lg:w-2/5 order-2 lg:order-1 bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-28rem)] lg:h-[calc(100vh-12rem)]">
              <RestaurantList
                restaurants={restaurants}
                isLoading={isLoading}
                error={error}
                selectedRestaurant={selectedRestaurant}
                onRestaurantSelect={handleRestaurantSelect}
                isMobile={window.innerWidth < 1024}
              />
            </div>

            {/* Desktop: Right Column (Fixed) / Mobile: Bottom */}
            <div className="lg:w-3/5 order-1 lg:order-2 h-[40vh] lg:h-[calc(100vh-12rem)]">
              {userLocation && (
                <Map
                  restaurants={restaurants}
                  center={userLocation}
                  onMarkerClick={handleRestaurantSelect}
                  selectedRestaurant={selectedRestaurant}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}