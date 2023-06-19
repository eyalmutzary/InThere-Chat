import React, { useEffect, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import styled from 'styled-components';

const API_KEY = 'sk.eyJ1IjoiZXlhbG11dHphcnkiLCJhIjoiY2xpeGhnZWFmMDhiaTNtcWYzMXg3dWJ4eSJ9.mi8dwr6pAHob13pkRWIU0A';


const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main3};
  border-radius: 5px;
  padding: 0 10px;
  font-size: 20px;
`;


const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState({ longitude: 0, latitude: 0 });
  const [viewport, setViewport] = useState({
    latitude: localStorage.getItem('latitude'),
    longitude: localStorage.getItem('longitude'),
    zoom: 14,
    width: 800,
    height: 600,
  });

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
