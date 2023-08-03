import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from '../shared';
import 'react-phone-number-input/style.css';
import {firestore} from "../../firebase";
import { useNavigate } from 'react-router';

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
const DUMMY_IMAGE = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

function RoomDetails({ setRoomDetailsModal }) {
  const [roomMembers, setRoomMembers] = React.useState([]);
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId') ?? '';
  const room = searchParams.get('room');
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .where('location', '==', room)
      .onSnapshot((snapshot) => {
        const members = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoomMembers(members);
      });

    return () => unsubscribe();
    // TODO: fetch users to show the list of them
    // should get the array of uids from the room and (if exists) the event id (which has members attribute in it)

    // TODO: show description of the room (only if it is an event => eventId != '')

    // TODO: Add a button to leave the room (only if it is an event => eventId != '')
  }, []);
  console.log("roomMembers", roomMembers)

  const membersList = roomMembers && roomMembers.map(({uid, name, photoURL, phone}) => (
    <MemberWrapper key={uid} onClick={() => navigate(`/profile?uid=${uid}`)}>
      <Wrapper>
        <MemberImage src={photoURL ||DUMMY_IMAGE } />
        <MemberDetailsWrapper>
          <MemberName>{name}</MemberName>
          {/* <MemberLastSeen>{phone}</MemberLastSeen> */}
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
