import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { Icon} from '../shared';
import { authActions} from '../shared/store';
import ConversationItem from '../Conversations/ConversationItem';
import { TABS_OPTIONS} from '../Conversations/NavBar';
import { auth} from '../../firebase';
import ProfileButton from './components/ProfileButton';

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

// const LogoutButton = styled.button`
//   display: flex;
//   align-items: center;
//   background-color: ${({theme}) => theme.colors.lightGray};
//   border: none;
//   padding: 8px 16px;
//   border-radius: 8px;
//   cursor: pointer;
//   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
// `;

// const LogoutText = styled.span`
//   font-size: 18px;
//   font-weight: bold;
//   margin-right: 8px; /* Added margin to create space between text and icon */
// `;

// const LogoutIcon = styled(Icon)`
//   font-size: 24px;
// `;


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

// Dummy data
const ConversationItemsDummyData = [];

function Main() {
  const navigate = useNavigate();
  // const [image, setImage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [currentTab, setCurrentTab] = useState(TABS_OPTIONS.GROUPS);

  const ConversationItems = ConversationItemsDummyData.map((item) => (
    <ConversationItem
      key={item.title}
      title={item.title}
      notificationsAmount={item.notificationsAmount}
    />
  ));

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

          {ConversationItems.length > 0 ? ConversationItem : <Wrapper><SubText>No upcoming events.</SubText></Wrapper>}
        </ContentContainer>
      )}
    </Container>
  );
}

export default Main;
