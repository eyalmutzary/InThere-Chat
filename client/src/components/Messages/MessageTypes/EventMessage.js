import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {collection, doc, updateDoc,} from 'firebase/firestore';
import {firestore} from '../../../firebase';
import {Button, Icon} from '../../shared';
import {SENDER_TYPE} from '../../shared/constants';


const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isme}) => (isme)};
  margin-top: 8px;
  padding: 20px 20px 10px 20px;
  max-width: fit-content;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({theme}) => theme.colors.black};
`;

const JoinButton = styled(Button)`
  background-color: ${({theme}) => theme.colors.unique1};
  font-size: 20px;
  color: ${({theme}) => theme.colors.mainText};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const MyMessageWrapper = styled(MyMessageContainer)`
  background-color: ${({theme, messagetype}) => {
    switch (messagetype) {
      case SENDER_TYPE.ME:
        return theme.colors.subContainer;
      case SENDER_TYPE.USER_IN_LOCATION:
        return theme.colors.unique2;
      default:
        return theme.colors.yellow;
    }
  }};
  border-radius: ${({messagetype}) => (messagetype === SENDER_TYPE.ME ? '20px 20px 0px 20px' : '20px 20px 20px 0px')};
  max-width: max-content;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;

const EventDetail = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
`;


function EventMessage({
                        id,
                        senderType,
                        title,
                        members,
                        membersLimit,
                        eventDate,
                        eventHour,
                        eventLocation
                      }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const room = searchParams.get('room');

  const handleJoinToEvent = () => {
    if (!members.includes(user.uid)) {
      members.push(user.uid);
      const eventRef = doc(collection(firestore, 'Events'), id);
      updateDoc(eventRef, {members});
    }
    navigate(`/chat?room=${room}&eventId=${id}&eventName=${title}`);
    window.location.reload();
  };


  return (
    <MyMessageWrapper isme={senderType === SENDER_TYPE.ME ? 'flex-end' : 'flex-start'} messagetype={senderType}>
      <EventTitle>{title}</EventTitle>
      <EventDetail><Icon name={'clock'}/>&nbsp;&nbsp;{eventDate}, {eventHour}</EventDetail>
      <EventDetail><Icon name={'location-arrow'}/>&nbsp;&nbsp;{eventLocation}</EventDetail>
      <EventDetail>
        <Icon name={'user'}/>&nbsp;&nbsp;
        {membersLimit <= 0 ? `${members?.length} Members` : `${members?.length} / ${membersLimit} Memberss`}
      </EventDetail>
      {senderType !== SENDER_TYPE.ME &&
        <ButtonWrapper>
          <JoinButton onClick={() => handleJoinToEvent()}>Tap to Join!</JoinButton>
        </ButtonWrapper>}
    </MyMessageWrapper>
  );
}

export default EventMessage;
