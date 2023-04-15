import React from 'react';

import './Message.css';
import styled from "styled-components";

import ReactEmoji from 'react-emoji';
import { useSelector } from 'react-redux';


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
  align-items: ${({isSentByCurrentUser}) => isSentByCurrentUser ? 'flex-end' : 'flex-start'};
  margin: 16px;
`

// const ForeignMessageContainer = styled.div`
//    display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `

const MessageWrapper = styled.div`
  padding: 12px;
  max-width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({theme}) => theme.colors.black};

`

const MyMessageWrapper = styled(MessageWrapper)`
  background-color: ${({theme, isSentByCurrentUser}) => isSentByCurrentUser ? theme.colors.main2 : theme.colors.white};
  border-radius: 8px 8px 0px 8px;
  max-width: max-content;
  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
`

const ForeignMessageWapper = styled(MessageWrapper)`
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 8px 8px 8px 0px;
  /* box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2); */
`

const UsernameText = styled.div`
  font-family: Helvetica;
  color: ${({theme}) => theme.colors.darkGray};
  letter-spacing: 0.3px;
`

const MessageText = styled.div`
  font-size: 1.1em;
`

const TimeText = styled.div`
  font-size: 0.8em;
  margin: 6px;
  color: ${({theme}) => theme.colors.darkGray};

`



const Message = ({ message: { text, user }, name }) => {
  const loggedUser = useSelector(state => state.auth)

  // const time = new Date().toLocaleTimeString();
  // const timeWithoutSeconds = time.slice(0, -3);
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  // const trimmedName = name.trim().toLowerCase();
  const trimmedName = user.trim().toLowerCase();

  const isSentByCurrentUser = trimmedName === loggedUser.name.trim().toLowerCase();
  return (

          <MyMessageContainer isSentByCurrentUser={isSentByCurrentUser}> 
            <UsernameText>{trimmedName}</UsernameText>
            <MyMessageWrapper isSentByCurrentUser={isSentByCurrentUser}>
              <MessageText>{ReactEmoji.emojify(text)}</MessageText>
            </MyMessageWrapper>
            <TimeText>{time}</TimeText>
          </MyMessageContainer>

  );
}

export default React.memo(Message);