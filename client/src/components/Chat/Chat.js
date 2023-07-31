import React, {useCallback, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import RoomDetails from './RoomDetails';
import {firestore} from "../../firebase";
import {useSelector} from "react-redux";
import {addDoc, collection, limit, onSnapshot, orderBy, query, where,} from "firebase/firestore";
import {MESSAGE_TYPES} from '../shared/constants';

const OuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.background};

`;

function Chat() {
  // const scrollBottom = useRef(null);
  // const location = useLocation();
  // get the url parms:
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId') ?? '';
  const room = searchParams.get('room');

  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [events, setEvents] = useState([]);
  const [roomDetailsModal, setRoomDetailsModal] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const fetchMessages = useCallback(async () => {
    const q = query(
      collection(firestore, 'messages'),
      orderBy('createdAt', 'desc'),
      where('room', '==', room),
      limit(50),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        if (doc.data().relatedEventId === eventId) {
          fetchedMessages.push({...doc.data(), id: doc.id, messageType: MESSAGE_TYPES.MESSAGE});
        }
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  const fetchEvents = useCallback(async () => {
    if (eventId) {
      return;
    }
    const q = query(
      collection(firestore, 'Events'),
      // orderBy('createdAt', 'desc'),
      where('room', '==', user.location),
      limit(50),
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedEvents = [];
      QuerySnapshot.forEach((doc) => {
        fetchedEvents.push({...doc.data(), id: doc.id, messageType: MESSAGE_TYPES.EVENT});
      });
      const sortedEvents = fetchedEvents.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setEvents(sortedEvents);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    if (!room) {
      navigate('/main');
    }

    const unsubscribeMessages = fetchMessages();
    const unsubscribeEvents = fetchEvents();
    return () => {
      return unsubscribeMessages && unsubscribeEvents;
    };
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
        relatedEventId: eventId,
      };

      addDoc(collection(firestore, 'messages'), newMessage);
      setTypedMessage('');
    }
  };


  return (
    <OuterContainer>
      <InfoBar setRoomDetailsModal={setRoomDetailsModal}/>
      <Messages messages={messages} events={events}/>
      <Input message={typedMessage} setMessage={setTypedMessage} sendMessage={sendMessage}/>
      {roomDetailsModal && <RoomDetails setRoomDetailsModal={setRoomDetailsModal}/>}
    </OuterContainer>
  );
}

export default Chat;
