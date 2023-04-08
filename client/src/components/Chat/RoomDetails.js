import React, { useEffect, useMemo, useState } from 'react';
import { Button, Icon } from '../shared';
import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


const Backdrop = styled.div`
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100vh;
    width: 100vw;
`
const ModalWrapper = styled.div`
  position: relative;
  z-index: 11;
  width: 100%;
  max-width: 90vw;
  max-height: 70vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
  
`;
const ExitIcon = styled(Icon)`
  /* position: absolute;
  right: 10px;
  top: 10px; */
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
`
const MemberWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`
const MemberDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 8px;
`
const MemberImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
`
const MemberName = styled.div`
    font-size: 1.4rem;
`
const MemberLastSeen = styled.div`
    font-size: 0.8rem;
    /* margin: 8px; */
    color: ${({ theme }) => theme.colors.darkGray};
`
const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-width: fit-content;
`
const MessageIcon = styled(Icon)`
    color: ${({ theme }) => theme.colors.main2};
    font-size: 1.5rem;
    margin-right: 8px;
`


const RoomDetails = ({history, users, setRoomDetailsModal}) => {

    const membersList = users && users.map((user) => 
        <MemberWrapper>
            <Wrapper>
                <MemberImage src={"https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400"}/>
                <MemberDetailsWrapper>
                    <MemberName>{user.name}</MemberName>
                    <MemberLastSeen>Active 2 hours ago</MemberLastSeen>
                </MemberDetailsWrapper>
            </Wrapper>
            <MessageIcon name={"comment"}/>
        </MemberWrapper>
    )

    return (
        <Backdrop>
            <ModalWrapper>
                <TopWrapper>
                    <Title>Group Members</Title>
                    <Icon name={"times"} onClick={() => setRoomDetailsModal(false)}/>
                </TopWrapper>
                <MiddleWrapper>

                    {membersList}

                </MiddleWrapper>
            </ModalWrapper>
        </Backdrop>
)};

export default RoomDetails;