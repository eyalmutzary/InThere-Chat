import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import styled from 'styled-components';
// import './Chat.css';
import RoomDetails from "./RoomDetails";
import LikedMessages from "./LikedMessages";
import { MESSAGE_TYPES } from "../Messages/Message/Message";
import chatBackground from '../../assets/chatBackground.jpg';

const OuterContainer = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1D; */
  
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  /* add in image background */
  /* background-image: url(${chatBackground});
  background-blend-mode: darken;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center; */
  height: 60%;
  width: 35%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 100%;
    /* dark backdrop */
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    width: 60%;
  }
`;

const Backdrop = styled.div`
    background: rgba(0, 0, 0, 0.6);
    `

const likedMessagesDummyData = [
  {
    text: "Send from user in location",
    name: "user1",
    messageType: MESSAGE_TYPES.USER_IN_LOCATION,
    likes: 22,
  },
  {
    text: "Send from user not yet in the location",
    name: "user2",
    messageType: MESSAGE_TYPES.NOT_YET_IN_LOCATION_USER,
    likes: 17,
  },
  {
    text: "Send from me",
    name: "user4",
    messageType: MESSAGE_TYPES.LOCAL_USER,
    likes: 9,
  },
  {
    text: "Send from me",
    name: "user4",
    messageType: MESSAGE_TYPES.NONE,
    likes: 6,
  },
  {
    text: "Send from me",
    name: "user4",
    messageType: MESSAGE_TYPES.USER_IN_LOCATION,
    likes: 5,
  },
  {
    text: "Send from me",
    name: "user4",
    messageType: MESSAGE_TYPES.NOT_YET_IN_LOCATION_USER,
    likes: 4,
  }
]

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
const ENDPOINT = 'http://localhost:5000/'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomDetailsModal, setRoomDetailsModal] = useState(false);
  const [likedMessagesModal, setLikedMessagesModal] = useState(false);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <OuterContainer>
      <Container>
        <InfoBar room={room} setRoomDetailsModal={setRoomDetailsModal} setLikedMessagesModal={setLikedMessagesModal}/>
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Container>
      <TextContainer users={users}/>
      {/* <RoomDetails users={users} setRoomDetailsModal={setRoomDetailsModal}/> */}
      {roomDetailsModal && <RoomDetails users={users} setRoomDetailsModal={setRoomDetailsModal}/>}
      {likedMessagesModal && <LikedMessages messages={likedMessagesDummyData} setLikedMessagesModal={setLikedMessagesModal}/>}
    </OuterContainer>
  );
}

export default Chat;
