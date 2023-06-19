import React from 'react';
import './Message.css';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';
import { Icon } from '../../shared';
import { flagDictionary } from '../../shared/constants';

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isme }) => (isme)};
  margin: 16px;
`;

const MessageWrapper = styled.div`
  padding: 12px;
  max-width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.black};

`;
export const MESSAGE_TYPES = {
  ME: 'ME',
  USER_IN_LOCATION: 'USER_IN_LOCATION',
  NONE: 'NONE',
};

const MyMessageWrapper = styled(MessageWrapper)`
  background-color: ${({ theme, messagetype }) => {
    switch (messagetype) {
      case MESSAGE_TYPES.ME:
        return theme.colors.blue;
      case MESSAGE_TYPES.USER_IN_LOCATION:
        return theme.colors.green;
      default:
        return theme.colors.yellow;
    }
  }};
  border-radius: ${({ messagetype }) => (messagetype === MESSAGE_TYPES.ME ? '8px 8px 0px 8px' : '8px 8px 8px 0px')};
  max-width: max-content;
  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
`;

const UsernameText = styled.div`
  font-family: Helvetica,serif;
  color: ${({ theme }) => theme.colors.darkGray};
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
`;

const MessageText = styled.div`
  font-size: 1.2em;
`;

const TimeText = styled.div`
  font-size: 0.8em;
  margin: 6px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const LikesText = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.colors.darkGray};
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
  color: ${({ theme }) => theme.colors.red};
`;
const FlagIcon = styled.img`
  height: 28px;
  width: auto;
`;
const ProfileImage = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  margin-left: 8px;
`;

function Message({ text, name, messagetype, likes, country, createdAt }) {

  return (
      <MyMessageContainer isme={messagetype === MESSAGE_TYPES.ME ? 'flex-end' : 'flex-start'}>
        { messagetype !== MESSAGE_TYPES.ME
        && (
        <UsernameText>
          {name}&nbsp;&nbsp;
          {flagDictionary[country] && <FlagIcon src={flagDictionary[country].image} />}
        </UsernameText>
        )}
        <RowWrapper>
          {messagetype === MESSAGE_TYPES.ME && likes > 0 && <LikesText><HeartIcon name="heart" />&nbsp;{likes}</LikesText>}
          <MyMessageWrapper messagetype={messagetype}>
            <MessageText>{ReactEmoji.emojify(text)}</MessageText>
          </MyMessageWrapper>
          {messagetype !== MESSAGE_TYPES.ME && likes > 0 && <LikesText><HeartIcon name="heart" />&nbsp;{likes}</LikesText>}
        </RowWrapper>

        <TimeText>{createdAt}</TimeText>
      </MyMessageContainer>


  );
}

export default React.memo(Message);
