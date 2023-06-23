import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '../shared';
import 'react-phone-number-input/style.css';
import { firestore, auth } from "../../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
  addDoc,
} from "firebase/firestore";

const Backdrop = styled.div`
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0;
    height: 100vh;
    width: 100vw;
        @media (min-width: 320px) and (max-width: 480px) {
        height: 100%;
    }
`;
const ModalWrapper = styled.div`
  position: relative;
  z-index: 11;
  width: 100%;
  max-width: 90vw;
  max-height: 70vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
  
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    /* height: 100%; */
    max-height: 80%;
    overflow: auto;
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    width: 60%;
  }
  
`;

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    margin: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.main2};
`;
const Title = styled.div`
    font-size: 1.5rem;
`;
const MiddleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const MemberWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`;
const MemberDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 8px;
`;
const MemberImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
`;
const MemberName = styled.div`
    font-size: 1.4rem;
`;
const MemberLastSeen = styled.div`
    font-size: 0.8rem;
    /* margin: 8px; */
    color: ${({ theme }) => theme.colors.darkGray};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-width: fit-content;
`;
const MessageIcon = styled(Icon)`
    color: ${({ theme }) => theme.colors.main2};
    font-size: 1.5rem;
    margin-right: 8px;
`;

function RoomDetails({ setRoomDetailsModal }) {
  const [roomMembers, setRoomMembers] = React.useState([]);
  const eventId = searchParams.get('eventId') ?? '';
  const room = searchParams.get('room');
  
  // const fetchUsers = () => {
  //   const q = query(
  //     collection(firestore, 'users'),
  //     limit(50),
  //   );

  //   const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  //     const fetchedUsers = [];
  //     QuerySnapshot.forEach((doc) => {
  //       fetchedUsers.push({ ...doc.data() });
  //     });
  //     console.log(fetchedUsers);
  //   });

  //   return () => unsubscribe;
  // };

  useEffect(() => {
    // TODO: fetch users
    // should get the array of uids from the room and (if exists) the event id (which has members attribute in it)
  }, []);

  const membersList = roomMembers && roomMembers.map((user) => (
    <MemberWrapper key={user}>
      <Wrapper>
        <MemberImage src="https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400" />
        <MemberDetailsWrapper>
          <MemberName>{user.name}</MemberName>
          <MemberLastSeen>Active 2 hours ago</MemberLastSeen>
        </MemberDetailsWrapper>
      </Wrapper>
      <MessageIcon name="comment" />
    </MemberWrapper>
  ));
  return (
    <Backdrop>
      <ModalWrapper>
        <TopWrapper>
          <Title>Group Members</Title>
          <Icon name="times" onClick={() => setRoomDetailsModal(false)} />
        </TopWrapper>
        <MiddleWrapper>

          {membersList}

        </MiddleWrapper>
      </ModalWrapper>
    </Backdrop>
  );
}

export default RoomDetails;
