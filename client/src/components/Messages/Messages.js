import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message, { MESSAGE_TYPES } from './Message/Message';
import './Messages.css';

function Messages({ messages }) {
  const loggedUser = useSelector((state) => state.auth);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollToBottom className="messages">
      <div ref={messagesContainerRef}>
        {messages.map(({ text, user }, index) => {
          const messageType = user.trim().toLowerCase() === loggedUser.name.trim().toLowerCase()
            ? MESSAGE_TYPES.ME
            : MESSAGE_TYPES.USER_IN_LOCATION;

          return (
            <Message
              key={`message-${index}`}
              text={text}
              name={user.trim().toLowerCase()}
              likes={0}
              messagetype={messageType}
            />
          );
        })}
      </div>
    </ScrollToBottom>
  );
}

export default Messages;
