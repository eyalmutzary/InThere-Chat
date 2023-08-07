import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Icon} from '../shared';
import {useSelector} from "react-redux";
import axios from "axios";
import {photoAPIkey} from "../shared/constants";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: ${({theme}) => theme.colors.subContainer};
  color: ${({theme}) => theme.colors.mainText};
  padding: 12px;
`;

const Button = styled.button`
  border: none;
  background: none;
`;

const BasicIcon = styled(Icon)`
  padding-right: 12px;
  font-size: 1.5rem;
`;

const RoomDetails = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;


const RoomTitle = styled.span`
  font-size: 1.4rem;
  min-width: fit-content;
`;
const Image = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-right: 12px;
  object-fit: cover;
`;

function InfoBar({setRoomDetailsModal}) {
  const [image, setImage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const eventName = searchParams.get('eventName') ?? '';
  const room = searchParams.get('room');
  const user = useSelector((state) => state.auth.user);
  const title = user.location;

  useEffect(() => {
    console.log(user.location)
    axios.get(`https://api.unsplash.com/search/photos?query=${title}&client_id=${photoAPIkey}`)
      .then((response) => {
        setImage(response.data.results[0].urls.small)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.location])

  return (
    <Container>
      <Button>
        <BasicIcon onClick={() => navigate("/main")} name="chevron-left"/>
      </Button>
      <RoomDetails onClick={() => setRoomDetailsModal(true)}>
        <Image src={image}/>
        <RoomTitle>{eventName ? eventName : room}</RoomTitle>
      </RoomDetails>
    </Container>
  );
}

export default InfoBar;
