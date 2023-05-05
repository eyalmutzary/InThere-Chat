import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message, { MESSAGE_TYPES } from './Message/Message';

import './Messages.css';
import { useSelector } from 'react-redux';

const messagesDummyData = [
  {
    text: "Send from user in location",
    name: "user1",
    messageType: MESSAGE_TYPES.USER_IN_LOCATION,
    likes: 12,
  },
  {
    text: "Send from user not yet in the location",
    name: "user2",
    messageType: MESSAGE_TYPES.NOT_YET_IN_LOCATION_USER,
    likes: 3,
  },
  {
    text: "Send from local user",
    name: "user3",
    messageType: MESSAGE_TYPES.LOCAL_USER,
    likes: 0,
  },
  {
    text: "Send from me",
    name: "user4",
    messageType: MESSAGE_TYPES.ME,
    likes: 5,
  }
]

const Messages = ({ messages, name }) => {
  const loggedUser = useSelector(state => state.auth)
  console.log(messages)

  // const trimmedName = name.trim().toLowerCase();
  // const isSentByMe = trimmedName === loggedUser.name.trim().toLowerCase();

  return (
  <ScrollToBottom className="messages">
    {messagesDummyData && messagesDummyData.map(({...rest}) => <Message {...rest} />)}
    {messages && messages.map(({text, user}, i) => <Message key={i} text={text} name={user.trim().toLowerCase()} likes={0}
    messageType={
      user.trim().toLowerCase() === loggedUser.name.trim().toLowerCase() ? MESSAGE_TYPES.ME : MESSAGE_TYPES.USER_IN_LOCATION
      }/>)}
  </ScrollToBottom>
)};

export default Messages;