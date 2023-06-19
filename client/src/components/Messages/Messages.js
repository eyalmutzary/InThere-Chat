import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message, { MESSAGE_TYPES } from './Message/Message';
import './Messages.css';
import { getTimeFromISOString, getTimeString } from '../shared/utils';

function Messages({ messages }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const messagesContainerRef = useRef();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messagesContainerRef, messages]);

  const MessagesList = messages.map(({ text, name, createdAt }, index) => {
    const messageType = name.trim().toLowerCase() === loggedUser.name.trim().toLowerCase()
      ? MESSAGE_TYPES.ME
      : MESSAGE_TYPES.USER_IN_LOCATION;

    return (
      <Message
        key={`message-${index}`}
        text={text}
        name={name.trim()}
        likes={1}
        messagetype={messageType}
        createdAt={getTimeFromISOString(createdAt)}
      />
    );
  }).reverse();

  return (
    <div className="messages">
      {MessagesList}
      <div style={{ float:"left", clear: "both" }}
        ref={messagesContainerRef}>
      </div>
    </div>
  );
}

export default Messages;
