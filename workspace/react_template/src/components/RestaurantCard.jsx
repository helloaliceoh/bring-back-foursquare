// src/components/RestaurantCard.jsx
function RestaurantCard({ restaurant, isSelected, isMobile }) {
  const {
    name,
    rating,
    price,
    location,
    categories,
    topTip
  } = restaurant;

  return (
    <div 
      className={`p-4 border rounded-lg mb-4 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
    >
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {rating && (
              <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
                {rating.toFixed(1)}/10
              </span>
            )}
            {price && (
              <span className="text-sm text-gray-600">
                {'$'.repeat(price)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-600">
            {location.formatted_address}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {categories.map(cat => cat.name).join(', ')}
          </p>
        </div>

        {topTip && !isMobile && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              "{topTip.text.length > 200 
                ? topTip.text.substring(0, 200) + '...' 
                : topTip.text}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantCard;