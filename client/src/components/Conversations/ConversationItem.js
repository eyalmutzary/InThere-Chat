import React, { useEffect, useMemo, useState } from 'react';
import { Button, Icon } from '../shared';
import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { authActions } from '../shared/store';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
    justify-content: space-between;
  background-color: white;
  border-top: 1px solid ${({theme}) => theme.colors.main1};
  padding: 12px;
`
const Image = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 12px;
`

const ChatTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`
const Notification = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: ${({theme}) => theme.colors.main2};
    border-radius: 4px;
    width: fit-content;
    padding: 8px;
    margin: 12px;
`

const RowWrapper = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: row;
    align-items: center;
    `


const ConversationItem = ({history, title, notificationsAmount}) => {


    return (
    <Container>
        <RowWrapper>
            <Image src={"https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400"} />
            <ChatTitle>{title}</ChatTitle>
        </RowWrapper>

        {notificationsAmount > 0 &&
        <RowWrapper>
            <Notification>{notificationsAmount}</Notification>
            <Icon name="chevron-right"/>
        </RowWrapper>}
    </Container>

)};

export default ConversationItem;