import React, { useEffect, useMemo, useState } from 'react';
import { Button, Icon } from '../shared';
import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../Messages/Message/Message';


const Backdrop = styled.div`
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:0px;
    height: 100vh;
    width: 100vw;
        @media (min-width: 320px) and (max-width: 480px) {
        height: 100%;
    }
`
const ModalWrapper = styled.div`
  position: relative;
  z-index: 11;
  width: 100%;
  max-width: 90vw;
  max-height: 70vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
  
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    /* height: 100%; */
    /* max-height: 80%; */
    overflow: hidden; 
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    width: 60%;
  }
  
`;

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    margin: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.main2};
`
const Title = styled.div`
    font-size: 1.5rem;
`
const MiddleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 80vh;
    overflow: auto;
`
const MemberWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`


const LikedMessages = ({history, messages, setLikedMessagesModal}) => {
    const messageList = messages && messages.map(({...rest}) => 
            <Message {...rest}/>
    )

    
    return (
        <Backdrop>
            <ModalWrapper>
                <TopWrapper>
                    <Title>Most Liked Messages</Title>
                    <Icon name={"times"} onClick={() => setLikedMessagesModal(false)}/>
                </TopWrapper>
                <MiddleWrapper>
                    {messageList}

                </MiddleWrapper>
            </ModalWrapper>
        </Backdrop>
)};

export default LikedMessages;