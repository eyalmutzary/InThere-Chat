import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import RoomDetails from './RoomDetails';

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
`;

const MessagesContainer = styled.div`
  overflow-y: scroll;
  padding: 20px;
`;

const InputContainer = styled.div`
  padding: 20px;
`;

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
const ENDPOINT = 'http://localhost:5001';

let socket;

function Chat() {
  const location = useLocation();
  // const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomDetailsModal, setRoomDetailsModal] = useState(false);

  useEffect(() => {
    const { name, room: loggedRoom } = queryString.parse(location.search);

    socket = io(ENDPOINT).connect();

    setRoom(loggedRoom);
    // setName(name);

    console.log('name:', name);
    console.log('room:', room);
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('joined room');
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages((oldMessages) => [...oldMessages, newMessage]);
    });

    socket.on('roomData', ({ newUsers }) => {
      setUsers(newUsers);
    });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      console.log('Sending message:', message); // Add this line

      socket.emit('sendMessage', message, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent');
          setMessage('');
        }
      });
    }
  };

  return (
    <OuterContainer>
      <InfoBar room={room} setRoomDetailsModal={setRoomDetailsModal} />
      <ChatContainer>
        <MessagesContainer>
          <Messages messages={messages} />
        </MessagesContainer>
        <InputContainer>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </InputContainer>
      </ChatContainer>
      <TextContainer users={users} />
      {roomDetailsModal && <RoomDetails users={users} setRoomDetailsModal={setRoomDetailsModal} />}
    </OuterContainer>
  );
}

export default Chat;
