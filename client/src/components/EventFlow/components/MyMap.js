import {MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-search/dist/leaflet-search.src.css";
import L from "leaflet";
import {useEffect, useState} from "react";
import styled from 'styled-components';
import OpenCageGeocode from 'opencage-api-client';


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

const IconPerson = new L.Icon({
  iconUrl: require("../../../assets/map_icon.png"),
  popupAnchor: [12, 0]

})


export default function MyMap() {
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(localStorage.getItem('latitude') || 0);
  const [longitude, setLongitude] = useState(localStorage.getItem('longitude') || 0);
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState([latitude, longitude]);

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

  function handleMapClick(e) {
    const {lat, lng} = e.latlng;
    setMarkerPosition([lat, lng]);
    setLatitude(lat);
    setLongitude(lng);
  }

  const handleSearch = async () => {
    try {
      const response = await OpenCageGeocode.geocode({
        q: address,
        key: 'c310ab5564694ced808257c995239af2', // Replace this with your OpenCage API key
      });

      console.log(response);
      if (response.status.code === 200 && response.results.length > 0) {
        const {geometry} = response.results[0];
        setMarkerPosition([geometry.lat, geometry.lng]);
        setLatitude(geometry.lat);
        setLongitude(geometry.lng);
      } else {
        console.log('No results found for the search query.');
      }
    } catch (error) {
      console.error('Error searching for the location:', error);
    }
  };

  return (
    <Wrapper>
      <Input
        placeholder="Search for a location"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={handleSearch} // Trigger search when the user leaves the input field
      />

      <Container center={[latitude, longitude]} zoom={14} scrollWheelZoom={true} whenCreated={setMap}
                 onClick={handleMapClick}>
        {/*<SearchMap />*/}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={markerPosition} icon={IconPerson}>
          {/*<Popup>*/}
          {/*  A marker here!*/}
          {/*</Popup>*/}
        </Marker>
      </Container>
    </Wrapper>
  )
}