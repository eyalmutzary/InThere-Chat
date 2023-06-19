import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { Icon} from '../shared';
import { authActions} from '../shared/store';
import ConversationItem from '../Conversations/ConversationItem';
import { TABS_OPTIONS} from '../Conversations/NavBar';
import { auth, firestore} from '../../firebase';
import ProfileButton from './components/ProfileButton';
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
  align-items: center;
  justify-content: space-between;
  background-image: url("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
  background-size: cover;
  position: relative;
  height: 30vh;
  margin: 12px;
  border-radius: 30px;
`;

const ContentContainer = styled.div`
  padding-bottom: 50px;
`;

const ButtonEnterChat = styled.div`
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  font-size: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 8px 16px 8px 16px;
  border-radius: 100px;
  margin-bottom: 20px;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`;

const AddButton = styled.button`
  color: ${({theme}) => theme.colors.darkGray};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  padding: 12px;
  border-radius: 1000px;
  border: none;
  background-color: ${({theme}) => theme.colors.lightGray};
  margin: 8px;
`;


const Location = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  width: fit-content;
  font-size: 20px;
  padding: 8px;
  border-radius: 8px;
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

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
`;


function Main() {
  const navigate = useNavigate();
  // const [image, setImage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [currentTab, setCurrentTab] = useState(TABS_OPTIONS.GROUPS);
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
        fetchedEvents.push({ ...doc.data(), id: doc.id, messageType: MESSAGE_TYPES.EVENT });
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

  const EventItems = events.map(({ title, id, room }) => {
    return (
    <ConversationItem
      key={id}
      eventId={id}
      title={title}
      room={room}
      notificationsAmount={0}
    />
    )});

  return (
    <Container>
      {currentTab === TABS_OPTIONS.GROUPS && (
        <ContentContainer>
            <ProfileButton />
          <CurrentPlaceWrapper location={user.location}>
            <Location>You're in {user.location}</Location>
            <ButtonEnterChat
              onClick={() => navigate(`/chat?room=${user.location}`)}
            >
              Enter Chat! &nbsp;&nbsp;
              <Icon name="chevron-right"/>
            </ButtonEnterChat>
          </CurrentPlaceWrapper>

          <RowWrapper>
            <Title>Your Events:</Title>
            {/* <SearchInput placeholder="Search..." /> */}
            <AddButton>
              <Icon name="comment-medical" onClick={() => navigate('/new-event')}/>
            </AddButton>
          </RowWrapper>

          {EventItems.length > 0 ? EventItems : <Wrapper><SubText>No upcoming events.</SubText></Wrapper>}
        </ContentContainer>
      )}
    </Container>
  );
}

export default Main;
