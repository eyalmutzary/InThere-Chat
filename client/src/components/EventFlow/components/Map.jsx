import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Map, MapGL, FitBoundsOptions } from 'react-map-gl';

const API_KEY = 'sk.eyJ1IjoiZXlhbG11dHphcnkiLCJhIjoiY2xpeGhnZWFmMDhiaTNtcWYzMXg3dWJ4eSJ9.mi8dwr6pAHob13pkRWIU0A';

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState({ longitude: 0, latitude: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);
  return (
    <Map
      initialViewState={{
        latitude: localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude'),
        zoom: 14,
        width: 800,
        height: 600,
      }}
      mapboxAccessToken={API_KEY}
      onClick={(e) => setSelectedLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      onViewportChange={(newViewport) => setViewport(newViewport)}
      FitBoundsOptions={{ padding: 20 }}
    >
      {selectedLocation && <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude} color="red" />}
    </Map>
  );
};

export default MapComponent;
