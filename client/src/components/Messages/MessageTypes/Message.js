import React, {useState} from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';
import {Icon} from '../../shared';
import {SENDER_TYPE} from '../../shared/constants';

const MyMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({isme}) => (isme)};
  margin: 16px;
`;

const MessageWrapper = styled.div`
  padding: 12px;
  max-width: fit-content;
  margin-top: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${({theme}) => theme.colors.black};

`;
// export const SENDER_TYPE = {
//   ME: 'ME',
//   USER_IN_LOCATION: 'USER_IN_LOCATION',
//   NONE: 'NONE',
// };

const MyMessageWrapper = styled(MessageWrapper)`
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
  border-radius: ${({messagetype}) => (messagetype === SENDER_TYPE.ME ? '8px 8px 0px 8px' : '8px 8px 8px 0px')};
  max-width: max-content;
  /* box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.2); */
`;

const UsernameText = styled.div`
  font-family: Helvetica, serif;
  color: ${({theme}) => theme.colors.darkGray};
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
  color: ${({theme}) => theme.colors.darkGray};
`;

const LikesText = styled.div`
  font-size: 0.9em;
  color: ${({theme}) => theme.colors.darkGray};
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
  color: ${({theme}) => theme.colors.red};
`;

const FlagIcon = styled.img`
  height: 28px;
  width: auto;
`;

const LikeButton = styled.button`
  background-color: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.red};
  border: None;
  border-radius: 4px;
  padding: 8px;
  margin: 4px;
`;


function Message({text, name, senderType, likes, country, createdAt}) {
  const [likeButton, setLikeButton] = useState(false);

  const handleMessageClick = () => {
    if (SENDER_TYPE.USER_IN_LOCATION === senderType) {
      setLikeButton(!likeButton);
    }
  };


  return (
    <MyMessageContainer isme={senderType === SENDER_TYPE.ME ? 'flex-end' : 'flex-start'} onClick={handleMessageClick}>
      {/*<RowWrapper>*/}
      {/*  {senderType !== SENDER_TYPE.ME*/}
      {/*    && (*/}
      {/*      <UsernameText>*/}
      {/*        {name}&nbsp;&nbsp;*/}
      {/*        {flagDictionary[country] && <FlagIcon src={flagDictionary[country].image}/>}*/}
      {/*      </UsernameText>*/}
      {/*    )}*/}
      {/*  <TimeText>{createdAt}</TimeText>*/}
      {/*</RowWrapper>*/}

      <RowWrapper>
        {senderType === SENDER_TYPE.ME && likes > 0 && <LikesText><HeartIcon name="heart"/>&nbsp;{likes}</LikesText>}
        <MyMessageWrapper messagetype={senderType}>
          <MessageText>{ReactEmoji.emojify(text)}</MessageText>
        </MyMessageWrapper>
        {senderType !== SENDER_TYPE.ME && likes > 0 && <LikesText><HeartIcon name="heart"/>&nbsp;{likes}</LikesText>}
      </RowWrapper>


    </MyMessageContainer>


  );
}

export default React.memo(Message);
