import React, {useState, useEffect, useRef, useCallback} from 'react';
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
  where,
  addDoc,
} from "firebase/firestore";
import { MESSAGE_TYPES } from '../shared/constants';

const OuterContainer = styled.div`
  height: 100svh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};
  max-height: 100%;
`;

const MessagesContainer = styled.div`
  overflow-y: scroll;
  padding: 40px 20px 0px 0px;
`;

const InputContainer = styled.div`
  padding: 20px;
`;

function Chat() {
  // const scrollBottom = useRef(null);
  // const location = useLocation();
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  const [roomDetailsModal, setRoomDetailsModal] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchMessages = useCallback(async () => {
    const q = query(
      collection(firestore, 'messages'),
      orderBy('createdAt', 'desc'),
      where('room', '==', user.location),
      limit(50),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id, messageType: MESSAGE_TYPES.MESSAGE });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  const fetchEvents = useCallback(async () => {
    const q = query(
      collection(firestore, 'Events'),
      // orderBy('createdAt', 'desc'),
      where('room', '==', user.location),
      limit(50),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedEvents = [];
      QuerySnapshot.forEach((doc) => {
        fetchedEvents.push({ ...doc.data(), id: doc.id, messageType: MESSAGE_TYPES.EVENT });
      });
      const sortedEvents = fetchedEvents.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setEvents(sortedEvents);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribeMessages = fetchMessages();
    const unsubscribeEvents = fetchEvents();



    return () => { return unsubscribeMessages && unsubscribeEvents; };
  }, []);


  const sendMessage = (event) => {
    event.preventDefault();
  
    if (typedMessage) {
      const newMessage = {
        name: user.name,
        room: user.location,
        text: typedMessage,
        createdAt: new Date().toISOString(),
        avatar: user.photoURL,
        uid: user.uid,
      };
      
      addDoc(collection(firestore, 'messages'), newMessage);
      setTypedMessage('');
    }
  };



  return (
    <OuterContainer>
      <InfoBar room={room} setRoomDetailsModal={setRoomDetailsModal} />
      <ChatContainer>
        <MessagesContainer>
          <Messages messages={messages} events={events}/>
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
