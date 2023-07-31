import React from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';
import {SENDER_TYPE} from '../../shared/constants';

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isme}) => (isme)};
  font-size: 1.2em;
  padding: 12px;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
`;

const MyMessageWrapper = styled(MyMessageContainer)`
  background-color: ${({theme, messagetype}) => {
    switch (messagetype) {
      case SENDER_TYPE.ME:
        return theme.colors.container;
      case SENDER_TYPE.USER_IN_LOCATION:
        return theme.colors.unique1;
      default:
        return theme.colors.yellow;
    }
  }};
  border-radius: ${({messagetype}) => (messagetype === SENDER_TYPE.ME ? '20px 20px 0px 20px' : '20px 20px 20px 0px')};
  word-break: break-all;

`;

function Message({text, senderType}) {
  return (
    <MyMessageWrapper isme={senderType === SENDER_TYPE.ME ? 'flex-end' : 'flex-start'} messagetype={senderType}>
      {ReactEmoji.emojify(text)}
    </MyMessageWrapper>
  );
}

export default Message;
