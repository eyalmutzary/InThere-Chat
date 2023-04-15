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
  height: 60%;
  width: 35%;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    width: 60%;
  }
`;

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
          <InfoBar room={room} setRoomDetailsModal={setRoomDetailsModal}/>
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </Container>
      <TextContainer users={users}/>
      {/* <RoomDetails users={users} setRoomDetailsModal={setRoomDetailsModal}/> */}
      {roomDetailsModal && <RoomDetails users={users} setRoomDetailsModal={setRoomDetailsModal}/>}
    </OuterContainer>
  );
}

export default Chat;
