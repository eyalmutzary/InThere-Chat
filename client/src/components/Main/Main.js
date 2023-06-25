import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Icon} from '../shared';
import ConversationItem from '../Conversations/ConversationItem';
import {firestore} from '../../firebase';
import ProfileButton from './components/ProfileButton';
import {collection, limit, onSnapshot, query, where,} from "firebase/firestore";
import {MESSAGE_TYPES} from '../shared/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.black};
  padding: 8px;
`;

const CurrentPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
  background-size: cover;
  position: relative;
  height: 30vh;
  margin: 12px;
  border-radius: 30px;
`;

const EndContainer = styled.div`
  display: flex;
  justify-content: end;
  flex: 1;
  align-items: end;
`;
const StartContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ContentContainer = styled.div`
  padding-bottom: 50px;
`;

const PicButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  width: fit-content;
  height: fit-content;
  font-size: 20px;
  padding: 8px;
  border-radius: 50px;
`;

const SubText = styled.div`
  font-size: 18px;
  color: ${({theme}) => theme.colors.darkGray};
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 12px;
  color: ${({theme}) => theme.colors.black};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


function Main() {
  const navigate = useNavigate();
  // const [image, setImage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [events, setEvents] = useState([]);

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
      <ContentContainer>
        <ProfileButton/>
        <CurrentPlaceWrapper location={user.location} onClick={() => navigate(`/chat?room=${user.location}`)}>
          <StartContainer>
            <PicButton>You're in {user.location}</PicButton>
          </StartContainer>
          <EndContainer>
            <PicButton>
              Enter Chat! &nbsp;&nbsp;
              <Icon name="chevron-right"/>
            </PicButton>
          </EndContainer>
        </CurrentPlaceWrapper>
        <Title>Your Events:</Title>
        {EventItems.length > 0 ? EventItems : <Wrapper><SubText>No upcoming events.</SubText></Wrapper>}
      </ContentContainer>
    </Container>
  );
}

export default Main;
