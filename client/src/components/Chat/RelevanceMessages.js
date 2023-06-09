import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';
import Messages from '../Messages/Messages';
import { Icon } from '../shared';

const OuterContainer = styled.div`
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;

const BackIcon = styled(Icon)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black};
  margin: 20px 0 0 20px;
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
const ENDPOINT = 'http://localhost:5001';

let socket;

function RelevanceMessages() {
  const navigate = useNavigate();
  const location = useLocation();
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT).connect();

    // setRoom(room);
    // setName(name);

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
      setMessages((oldState) => [...messages, newMessage]);
    });
  }, []);

  return (
    <OuterContainer>
      <BackIcon name="arrow-left" onClick={() => navigate(-1)} />
      <Container>
        <Messages messages={messages} />
      </Container>
    </OuterContainer>
  );
}

export default RelevanceMessages;
