// src/components/RestaurantList.jsx
import { useEffect, useRef } from 'react';
import RestaurantCard from './RestaurantCard';

function RestaurantList({ restaurants, isLoading, error, selectedRestaurant, onRestaurantSelect, isMobile }) {
  const listRef = useRef(null);
  const selectedRef = useRef(null);

  // Scroll to selected restaurant when it changes
  useEffect(() => {
    if (selectedRestaurant && selectedRef.current) {
      selectedRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedRestaurant]);

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading restaurants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        No restaurants found. Try adjusting your search.
      </div>
    );
  }

  return (
    <div ref={listRef} className="h-full overflow-auto p-4 scroll-smooth">
      {restaurants.map(restaurant => (
        <div
          key={restaurant.fsq_id}
          ref={selectedRestaurant?.fsq_id === restaurant.fsq_id ? selectedRef : null}
          onClick={() => onRestaurantSelect(restaurant)}
        >
          <RestaurantCard
            restaurant={restaurant}
            isSelected={selectedRestaurant?.fsq_id === restaurant.fsq_id}
            isMobile={isMobile}
          />
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;