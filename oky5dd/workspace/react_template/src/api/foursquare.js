// src/api/foursquare.js
const FOURSQUARE_API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;
const BASE_URL = 'https://api.foursquare.com/v3';

if (!FOURSQUARE_API_KEY) {
  console.error('Foursquare API key is missing. Please add it to your .env file.');
}

const headers = {
  'Accept': 'application/json',
  'Authorization': FOURSQUARE_API_KEY,
};

export const searchRestaurants = async (query, lat, lng) => {
  try {
    const params = new URLSearchParams({
      query: query || '',
      ll: `${lat},${lng}`,
      radius: 10000,
      categories: '13065',
      sort: 'RATING',
      limit: 50,
      fields: 'fsq_id,name,geocodes,location,categories,rating,price,hours'
    });

    const response = await fetch(
      `${BASE_URL}/places/search?${params}`,
      { headers }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch restaurants');
    }
    
    const data = await response.json();
    console.log('Search results:', data);
    
    // Fetch tips for each restaurant
    const restaurantsWithDetails = await Promise.all(
      data.results.map(async (restaurant) => {
        const tips = await getRestaurantTips(restaurant.fsq_id);
        return {
          ...restaurant,
          topTip: tips.length > 0 ? tips[0] : null
        };
      })
    );

    return { ...data, results: restaurantsWithDetails };
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const getRestaurantTips = async (fsqId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/places/${fsqId}/tips?sort=POPULAR&limit=1`,
      { headers }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch tips');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tips:', error);
    return [];
  }
};