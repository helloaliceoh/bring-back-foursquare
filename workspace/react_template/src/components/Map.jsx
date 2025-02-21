// src/components/Map.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ restaurants, center, onMarkerClick, selectedRestaurant }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([center.lat, center.lng], 13);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Cleanup
    return () => {
      if (map) {
        map.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(marker => {
      marker.remove();
    });
    markersRef.current = {};

    // Add new markers
    restaurants.forEach(restaurant => {
      const marker = L.marker(
        [restaurant.geocodes.main.latitude, restaurant.geocodes.main.longitude],
        {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div class="${selectedRestaurant?.fsq_id === restaurant.fsq_id ? 'bg-blue-500' : 'bg-red-500'} w-4 h-4 rounded-full"></div>`,
          })
        }
      ).addTo(mapInstanceRef.current);

      marker.on('click', () => onMarkerClick(restaurant));

      // Store marker reference
      markersRef.current[restaurant.fsq_id] = marker;
    });
  }, [restaurants, selectedRestaurant]);

  // Pan to selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRestaurant) return;

    mapInstanceRef.current.panTo([
      selectedRestaurant.geocodes.main.latitude,
      selectedRestaurant.geocodes.main.longitude
    ]);
  }, [selectedRestaurant]);

  return <div ref={mapRef} className="h-full rounded-lg overflow-hidden" />;
}

export default Map;