import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Icon} from '../shared';
import ConversationItem from './components/ConversationItem';
import {firestore} from '../../firebase';
import ProfileButton from './components/ProfileButton';
import {collection, limit, onSnapshot, query, where,} from "firebase/firestore";
import {MESSAGE_TYPES} from '../shared/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.mainText};
`;

const SubContainer = styled.div`
  background-color: ${({theme}) => theme.colors.container};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  border-radius: 30px;
  margin: 12px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 12px;
  color: ${({theme}) => theme.colors.black};
`;

const LocationImage = styled.img`
  width: 100%;
  height: 28vh;
  object-fit: cover;
  border-radius: 30px;
  background-image: url("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
`;

const SubText = styled.div`
  font-size: 18px;
  color: ${({theme}) => theme.colors.darkGray};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddButton = styled.button`
  background: ${({theme}) => theme.colors.subContainer};
  border-radius: 30px;
  font-size: 1.2em;
  border: none;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const colorList = ['#90f1ef', '#ffd6e0', '#ffef9f', '#c1fba4', '#7bf1a8'];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorList.length);
  return colorList[randomIndex];
}


function Main() {
  const navigate = useNavigate();
  // const [image, setImage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [events, setEvents] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId') ?? '';

  const fetchEvents = async () => {
    const q = query(
      collection(firestore, 'Events'),
      // orderBy('createdAt', 'desc'),
      where('room', '==', user.location),
      where('members', 'array-contains', user.uid),
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
  };

  useEffect(() => {
    const unsubscribe = fetchEvents();
    return () => unsubscribe;
  }, []);

  const EventItems = events.map(({title, id, room}) => {
    const randomBackgroundColor = getRandomColor();

    return (
      <ConversationItem
        key={id}
        eventId={id}
        title={title}
        room={room}
        notificationsAmount={0}
      />
    )
  });

  return (
    <Container>
      <ProfileButton/>
      <SubContainer onClick={() => navigate(`/chat?room=${user.location}`)}>
        <TextContainer>You're in {user.location}<Icon name="chevron-right"/></TextContainer>
        <LocationImage></LocationImage>
      < /SubContainer>
      <SubContainer>
        <TextContainer>Your Events:
          <AddButton hide={eventId} onClick={() => navigate('/new-event')}>
            <Icon name="comment-medical"/>
          </AddButton>
        </TextContainer>

        {EventItems.length > 0 ? EventItems : <Wrapper><SubText>No upcoming events.</SubText></Wrapper>}
      </SubContainer>
    </Container>
  );
}

export default Main;
