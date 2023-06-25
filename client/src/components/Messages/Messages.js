import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message/Message';
import './Messages.css';
import {getTimeFromISOString} from '../shared/utils';
import {MESSAGE_TYPES, SENDER_TYPE} from '../shared/constants';
import EventMessage from './EventMessage';

function Messages({ messages, events }) {
  const [combinedMessages, setCombinedMessages] = useState([]);
  const loggedUser = useSelector((state) => state.auth.user);
  const messagesContainerRef = useRef();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: 'instant' });
    }
  };

  const mergeAndSortMessages = () => {
    const mergedArray = [...messages, ...events];
    mergedArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setCombinedMessages(mergedArray);
  };

  useEffect(() => {
    mergeAndSortMessages();
  }, [messagesContainerRef, messages, events]);

  useEffect(() => {
    scrollToBottom();
  }, [combinedMessages]);

  const MessagesList = combinedMessages.map((data, index) => {
    if (data.messageType === MESSAGE_TYPES.EVENT) {
      const senderType = data.createdByUid === loggedUser.uid
        ? SENDER_TYPE.ME
        : SENDER_TYPE.USER_IN_LOCATION;
      return (
        <EventMessage 
          id={data.id}
          key={`message-${index}`}
          name={data.createdBy}
          likes={0}
          senderType={senderType}
          createdAt={getTimeFromISOString(data.createdAt)}
          title={data.title}
          membersLimit={data.membersLimit}
          membersRegistered={data.membersRegistered}
          eventDate={data.eventDate}
          eventHour={data.eventHour}
          eventLocation={data.eventLocation}
          members={data.members}
        />
      );
    }
    const senderType = data.uid === loggedUser.uid
      ? SENDER_TYPE.ME
      : SENDER_TYPE.USER_IN_LOCATION;

    return (
      <Message
          key={`message-${index}`}
          text={data.text}
          name={data.name.trim()}
          likes={0}
          senderType={senderType}
          createdAt={getTimeFromISOString(data.createdAt)}
      /> 
    );
  });

  return (
    <div className="messages">
      {MessagesList}
      <div style={{ float:"left", clear: "both" }} ref={messagesContainerRef} />
    </div>
  );
}

export default Messages;
