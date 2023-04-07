import React from 'react';

import './Message.css';
import styled from "styled-components";

import ReactEmoji from 'react-emoji';


const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 16px;
`

const ForeignContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 8px;
`

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ForeignMessageContainer = styled.div`
   display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const MessageWrapper = styled.div`
  padding: 12px;
  width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);

`

const MyMessageWrapper = styled(MessageWrapper)`
  background-color: #2979FF;
  border-radius: 8px 8px 0px 8px;
  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
`

const ForeignMessageWapper = styled(MessageWrapper)`
  background-color: #F3F3F3;
  border-radius: 8px 8px 8px 0px;
  /* box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2); */
`

const UsernameText = styled.div`
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
`

const MessageText = styled.div`
  font-size: 1.1em;
`

const TimeText = styled.div`
  font-size: 0.8em;
  margin: 6px;
`



const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  // const time = new Date().toLocaleTimeString();
  // const timeWithoutSeconds = time.slice(0, -3);
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <MyContainer>
          <MyMessageContainer> 
            <UsernameText>{trimmedName}</UsernameText>
            <MyMessageWrapper>
              <MessageText>{ReactEmoji.emojify(text)}</MessageText>
            </MyMessageWrapper>
            <TimeText>{time}</TimeText>
          </MyMessageContainer>
        </MyContainer>
        )
        : (
          <ForeignContainer>
            <ForeignMessageContainer> 
              <UsernameText>{trimmedName}</UsernameText>
              <ForeignMessageWapper>
                <MessageText>{ReactEmoji.emojify(text)}</MessageText>
              </ForeignMessageWapper>
              <TimeText>{time}</TimeText>
            </ForeignMessageContainer>
            {/* <p className="sentText pl-10 ">{user}</p> */}
          </ForeignContainer>
        )
  );
}

export default Message;