import React from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';
import { Button, Icon } from '../shared';
import { flagDictionary, SENDER_TYPE } from '../shared/constants';
import { firestore } from '../../firebase';
import { FieldValue } from 'firebase/firestore';
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isme }) => (isme)};
  margin: 16px;
`;

const MessageWrapper = styled.div`
  padding: 20px;
  max-width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.black};

`;


const MyMessageWrapper = styled(MessageWrapper)`
  background-color: ${({ theme, messagetype }) => {
    switch (messagetype) {
      case SENDER_TYPE.ME:
        return theme.colors.blue;
      case SENDER_TYPE.USER_IN_LOCATION:
        return theme.colors.green;
      default:
        return theme.colors.yellow;
    }
  }};
  border-radius: ${({ messagetype }) => (messagetype === SENDER_TYPE.ME ? '8px 8px 0px 8px' : '8px 8px 8px 0px')};
  max-width: max-content;
  display: flex;
    flex-direction: column;

  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
`;

const UsernameText = styled.div`
  font-family: Helvetica,serif;
  color: ${({ theme }) => theme.colors.darkGray};
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
`;

const MessageText = styled.div`
  font-size: 1.2em;
`;

const TimeText = styled.div`
  font-size: 0.8em;
  margin: 6px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const LikesText = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.darkGray};
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const HeartIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.red};
`;
const FlagIcon = styled.img`
  height: 28px;
  width: auto;
`;
const ProfileImage = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  margin-left: 8px;
`;

const EventTitle = styled.div`
    font-size: 30px;
    margin-bottom: 10px;
    line-height: 1.4;
`;

const EventDetail = styled.div`
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;

`;


function EventMessage({ id, name, senderType, likes, country, createdAt, title, membersLimit, membersRegistered, eventDate, eventHour, eventLocation }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleJoinToEvent = () => {
    const eventRef = firestore.collection('events').doc(id);
  
    eventRef.update({
      members: FieldValue.arrayUnion([user.uid]),
      // TODO: update membersRegistered
    //   membersRegistered: FieldValue.arraySize(members),
    });

    navigate(`/chat?room=${user.location}&eventId=${id}`);
  };
  
  return (
    <MyMessageContainer isme={senderType === SENDER_TYPE.ME ? 'flex-end' : 'flex-start'}>
        { senderType !== SENDER_TYPE.ME
        && (
        <UsernameText>
          {name}&nbsp;&nbsp;
          {flagDictionary[country] && <FlagIcon src={flagDictionary[country].image} />}
        </UsernameText>
        )}
        <RowWrapper>
          {senderType === SENDER_TYPE.ME && likes > 0 && <LikesText><HeartIcon name="heart" />&nbsp;{likes}</LikesText>}
          
          <MyMessageWrapper messagetype={senderType}>
            <EventTitle>{title}</EventTitle>
            <EventDetail><Icon name={'clock'} />&nbsp;&nbsp;{eventDate}, {eventHour}</EventDetail>
            <EventDetail><Icon name={'location-arrow'} />&nbsp;&nbsp;{eventLocation}</EventDetail>
            <EventDetail><Icon name={'user'} />&nbsp;&nbsp;{membersRegistered} / {membersLimit}</EventDetail>
            {senderType !== SENDER_TYPE.ME && <Button onClick={() => handleJoinToEvent()}>Tap to Join!</Button>}
          </MyMessageWrapper>

          {senderType !== SENDER_TYPE.ME && likes > 0 && <LikesText><HeartIcon name="heart" />&nbsp;{likes}</LikesText>}
        </RowWrapper>

        <TimeText>{createdAt}</TimeText>
      </MyMessageContainer>


  );
}

export default React.memo(EventMessage);
