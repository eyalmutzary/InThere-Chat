import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {collection, doc, updateDoc,} from 'firebase/firestore';
import {firestore} from '../../../firebase';
import {Button, Icon} from '../../shared';
import {flagDictionary, SENDER_TYPE} from '../../shared/constants';


const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isme}) => (isme)};
  margin: 16px;
`;

const MessageWrapper = styled.div`
  padding: 20px;
  max-width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({theme}) => theme.colors.black};

`;


const MyMessageWrapper = styled(MessageWrapper)`
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
  border-radius: ${({messagetype}) => (messagetype === SENDER_TYPE.ME ? '8px 8px 0px 8px' : '8px 8px 8px 0px')};
  max-width: max-content;
  display: flex;
  flex-direction: column;

  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
`;

const UsernameText = styled.div`
  font-family: Helvetica, serif;
  color: ${({theme}) => theme.colors.darkGray};
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
`;

const TimeText = styled.div`
  font-size: 0.8em;
  margin: 6px;
  color: ${({theme}) => theme.colors.darkGray};
`;

const LikesText = styled.div`
  font-size: 0.9em;
  color: ${({theme}) => theme.colors.darkGray};
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
  color: ${({theme}) => theme.colors.red};
`;

const FlagIcon = styled.img`
  height: 28px;
  width: auto;
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


function EventMessage({
                        id,
                        name,
                        senderType,
                        likes,
                        country,
                        createdAt,
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
    <MyMessageContainer isme={senderType === SENDER_TYPE.ME ? 'flex-end' : 'flex-start'}>
      <RowWrapper>

        {senderType !== SENDER_TYPE.ME
          && (
            <UsernameText>
              {name}&nbsp;&nbsp;
              {flagDictionary[country] && <FlagIcon src={flagDictionary[country].image}/>}
            </UsernameText>
          )}
        <TimeText>{createdAt}</TimeText>
      </RowWrapper>
      <RowWrapper>
        {senderType === SENDER_TYPE.ME && likes > 0 && <LikesText><HeartIcon name="heart"/>&nbsp;{likes}</LikesText>}

        <MyMessageWrapper messagetype={senderType}>
          <EventTitle>{title}</EventTitle>
          <EventDetail><Icon name={'clock'}/>&nbsp;&nbsp;{eventDate}, {eventHour}</EventDetail>
          <EventDetail><Icon name={'location-arrow'}/>&nbsp;&nbsp;{eventLocation}</EventDetail>
          <EventDetail>
            <Icon name={'user'}/>&nbsp;&nbsp;
            {membersLimit <= 0 ? `${members?.length} Members` : `${members?.length} / ${membersLimit} Memberss`}
          </EventDetail>
          {senderType !== SENDER_TYPE.ME && <Button onClick={() => handleJoinToEvent()}>Tap to Join!</Button>}
        </MyMessageWrapper>

        {senderType !== SENDER_TYPE.ME && likes > 0 && <LikesText><HeartIcon name="heart"/>&nbsp;{likes}</LikesText>}
      </RowWrapper>

    </MyMessageContainer>


  );
}

export default React.memo(EventMessage);
