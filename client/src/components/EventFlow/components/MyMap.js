import {MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-search/dist/leaflet-search.src.css";
import L from "leaflet";
import {useEffect, useRef, useState} from "react";
import styled from 'styled-components';
import OpenCageGeocode from 'opencage-api-client';
import {mapAPIkey} from "../../shared/constants/allConstants";


const Wrapper = styled.div`
  height: 52vh;
  width: 90vw;
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  background-color: ${({theme}) => theme.colors.container};
  border-radius: 30px;
`;

const Container = styled(MapContainer)`
  height: 46vh;
  width: 90vw;
  resize: none;
  border-radius: 30px;

  .leaflet-control-search {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  width: 80vw;
  height: 40px;
  border: none;
  background-color: ${({theme}) => theme.colors.subContainer};
  border-radius: 30px;
  padding: 0 10px;
  font-size: 20px;
  margin: 12px;
`;

const List = styled.ul`
  width: 90%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  cursor: pointer;
  margin: 4px;
  padding: 4px 12px;
  background-color: ${({theme}) => theme.colors.unique1};
  border-radius: 20px;


  &:hover {
    background-color: ${({theme}) => theme.colors.unique2};
  }
`;

const IconPerson = new L.Icon({
  iconUrl: require("../../../assets/map_icon.png"),
  popupAnchor: [12, 0]

})


export default function MyMap() {
  const mapRef = useRef(null);

  const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || 0);
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || 0);
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState([latitude, longitude]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {

    if (mapRef.current) {
      mapRef.current.setView(markerPosition, 14);
    }
  }, [markerPosition]);

  const handleMapCreated = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);

  const handleMarkerDrag = (e) => {
    const {lat, lng} = e.target.getLatLng();
    setMarkerPosition([lat, lng]);
    setLatitude(lat);
    setLongitude(lng);
  };


  const handleSearch = async () => {
    try {
      const response = await OpenCageGeocode.geocode({
        q: address,
        key: mapAPIkey, // Replace this with your OpenCage API key
      });

      if (response.status.code === 200 && response.results.length > 0) {
        const results = response.results.slice(0, 3); // Take the top 3 results
        setSearchResults(results);
      } else {
        console.log('No results found for the search query.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for the location:', error);
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (selectedLocation) => {
    const {geometry} = selectedLocation;
    setMarkerPosition([geometry.lat, geometry.lng]);
    setLatitude(geometry.lat);
    setLongitude(geometry.lng);
    setAddress("");
    setSearchResults([]); // Clear search results after selecting a location
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    setSearchResults([]); // Clear search results when typing

    if (e.target.value.length >= 3) {
      handleSearch(); // Trigger search only when 3 or more characters are typed
    }
  };

  return (
    <Wrapper>
      <Input
        placeholder="Search for a location"
        value={address}
        onChange={handleInputChange} // Trigger search after every character typed
      />

      {searchResults.length > 0 && (
        <List>
          {searchResults.map((result) => (
            <ListItem key={result.annotations.geohash} onClick={() => handleSelectLocation(result)}>
              {result.formatted}
            </ListItem>
          ))}
        </List>
      )}

      <Container center={markerPosition} zoom={14} scrollWheelZoom={true} whenCreated={handleMapCreated}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={markerPosition} icon={IconPerson} draggable={true}
                eventHandlers={{dragend: handleMarkerDrag}}>
          {/*<Popup>*/}
          {/*  A marker here!*/}
          {/*</Popup>*/}
        </Marker>
      </Container>
    </Wrapper>
  );
}