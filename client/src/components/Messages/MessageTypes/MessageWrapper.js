import React from 'react';
import styled from 'styled-components';
import {flagDictionary, MESSAGE_TYPES, SENDER_TYPE} from '../../shared/constants';
import Message from "./Message";
import EventMessage from "./EventMessage";
import {getTimeFromISOString} from "../../shared/utils";
import {useSelector} from "react-redux";

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isme}) => (isme)};
  margin: 16px;
`;

const UsernameText = styled.div`
  display: flex;
  align-items: center;
`;

const TimeText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: ${({theme}) => theme.colors.darkGray};
`;

const FlagIcon = styled.img`
  height: 28px;
  width: auto;
`;

function createMessage(key, text, senderType) {
  return (
    <Message
      key={key}
      text={text}
      senderType={senderType}
    />
  )
}

function createEventMessage(key, senderType, title, membersLimit, membersRegistered,
                            eventDate, eventHour, eventLocation) {
  return (
    <EventMessage
      id={key}
      senderType={senderType}
      title={title}
      membersLimit={membersLimit}
      members={membersRegistered}
      eventDate={eventDate}
      eventHour={eventHour}
      eventLocation={eventLocation}
    />
  )
}

function MessageWrapper({data, index}) {
  const loggedUser = useSelector((state) => state.auth.user);
  let message;
  let name;
  let senderType;
  if (data.messageType === MESSAGE_TYPES.EVENT) {
    senderType = data.createdByUid === loggedUser.uid
      ? SENDER_TYPE.ME
      : SENDER_TYPE.USER_IN_LOCATION;

    message = createEventMessage(data.id, senderType,
      data.title, data.membersLimit, data.membersRegistered, data.eventDate, data.eventHour, data.eventLocation)
    name = data.createdBy;
  } else {
    senderType = data.uid === loggedUser.uid
      ? SENDER_TYPE.ME
      : SENDER_TYPE.USER_IN_LOCATION;
    message = createMessage(`message-${index}`, data.text, senderType)
    name = data.name.trim();
  }

  return (
    <MyMessageContainer isme={senderType === SENDER_TYPE.ME ? 'flex-end' : 'flex-start'}>
      <RowWrapper>
        {senderType !== SENDER_TYPE.ME
          && (
            <UsernameText>
              {name}&nbsp;&nbsp;
              {flagDictionary[data.country] && <FlagIcon src={flagDictionary[country].image}/>}
            </UsernameText>
          )}
        <TimeText>{getTimeFromISOString(data.createdAt)}</TimeText>
      </RowWrapper>
      {message}
    </MyMessageContainer>
  );
}

export default React.memo(MessageWrapper);
