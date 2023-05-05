import React from 'react';

import './Message.css';
import styled from "styled-components";

import ReactEmoji from 'react-emoji';
import { useSelector } from 'react-redux';
import { Icon } from '../../shared';


const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isSentByMe}) => isSentByMe ? 'flex-end' : 'flex-start'};
  margin: 16px;
`

const MessageWrapper = styled.div`
  padding: 12px;
  max-width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({theme}) => theme.colors.black};

`

const MyMessageWrapper = styled(MessageWrapper)`
  background-color: ${({theme, messageType}) => {
    switch(messageType){
      case MESSAGE_TYPES.ME:
        return theme.colors.blue
      case MESSAGE_TYPES.LOCAL_USER:
        return theme.colors.yellow
      case MESSAGE_TYPES.USER_IN_LOCATION:
        return theme.colors.orange
      case MESSAGE_TYPES.NOT_YET_IN_LOCATION_USER:
        return theme.colors.green
      default:
        return theme.colors.white
    }
  }};
  border-radius: ${({messageType}) => messageType === MESSAGE_TYPES.ME ? '8px 8px 0px 8px' : '8px 8px 8px 0px'};
  max-width: max-content;
  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
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

const LikesText = styled.div`
  font-size: 0.8em;
  color: ${({theme}) => theme.colors.darkGray};
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const HeartIcon = styled(Icon)`
  color: ${({theme}) => theme.colors.red};
`

export const MESSAGE_TYPES = {
  ME: 'ME',
  LOCAL_USER: 'LOCAL_USER',
  USER_IN_LOCATION: 'USER_IN_LOCATION',
  NOT_YET_IN_LOCATION_USER: 'NOT_YET_IN_LOCATION_USER',
  NONE: 'NONE'
}

const Message = ({ text, name, messageType, likes }) => {
  const loggedUser = useSelector(state => state.auth)

  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const trimmedName = name.trim().toLowerCase();
  const isSentByMe = trimmedName === loggedUser.name.trim().toLowerCase();

  return (

          <MyMessageContainer isSentByMe={messageType === MESSAGE_TYPES.ME}> 
            <UsernameText>{trimmedName}</UsernameText>
            <RowWrapper>
              {messageType === MESSAGE_TYPES.ME && likes > 0 && <LikesText><HeartIcon name={'heart'}/>&nbsp;{likes}</LikesText>}
              <MyMessageWrapper messageType={messageType}>
                <MessageText>{ReactEmoji.emojify(text)}</MessageText>
              </MyMessageWrapper>
              {messageType !== MESSAGE_TYPES.ME && likes > 0 && <LikesText><HeartIcon name={'heart'}/>&nbsp;{likes}</LikesText>}
            </RowWrapper>

            <TimeText>{time}</TimeText>
          </MyMessageContainer>

  );
}

export default React.memo(Message);