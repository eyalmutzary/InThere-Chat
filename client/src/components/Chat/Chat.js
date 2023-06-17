import React, {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import RoomDetails from './RoomDetails';
import { firestore } from "../../firebase";
import {useSelector} from "react-redux";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

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

function Chat() {
  const location = useLocation();
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomDetailsModal, setRoomDetailsModal] = useState(false);
  let user = useSelector((state) => state.auth.user);

  console.log('location:', location);
  console.log('room:', user.currentLocation);

  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        console.log(doc.data());
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (typedMessage) {
      console.log('Sending message:', typedMessage); // Add this line
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
          <Input message={typedMessage} setMessage={setTypedMessage} sendMessage={sendMessage} />
        </InputContainer>
      </ChatContainer>
      {roomDetailsModal && <RoomDetails users={users} setRoomDetailsModal={setRoomDetailsModal} />}
    </OuterContainer>
  );
}

export default Chat;
