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
import { TABS_OPTIONS } from './Main';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    width: 100%;
    position: fixed;
    bottom: 0px;
`

const NavButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-top: 3px solid ${({ theme, isSelected}) => isSelected ? theme.colors.main2 : theme.colors.white};
    /* background-color: ${({ theme, isSelected}) => isSelected ? theme.colors.main2 : theme.colors.white}; */
    /* color: ${({ theme, isSelected}) => isSelected ? theme.colors.white : theme.colors.main2}; */
    color: ${({theme}) => theme.colors.main2};
    cursor: pointer;
    width: 100%;
    font-size: 1.5rem;
    padding: 12px;
`

const NavIcon = styled(Icon)`
    /* background-color: ${({ theme, isSelected}) => isSelected ? theme.colors.main1 : theme.colors.white}; */
`


const NavBar = ({history, currentTab, setCurrentTab}) => {

    return (
    <Container>
        <NavButton isSelected={currentTab === TABS_OPTIONS.GROUPS} onClick={()=> setCurrentTab(TABS_OPTIONS.GROUPS)}>
            <Icon  name={"users"}/>
        </NavButton>
        <NavButton isSelected={currentTab === TABS_OPTIONS.PRIVATES} onClick={()=> setCurrentTab(TABS_OPTIONS.PRIVATES)}>
            <Icon  name={"user"}/>
        </NavButton>
        <NavButton isSelected={currentTab === TABS_OPTIONS.ARCHIVE} onClick={()=> setCurrentTab(TABS_OPTIONS.ARCHIVE)}>
            <Icon  name={"archive"}/>
        </NavButton>
        {/* <NavIcon isSelected={currentTab === TABS_OPTIONS.PRIVATES} name={"user"}/>
        <NavIcon isSelected={currentTab === TABS_OPTIONS.ARCHIVE} name={"archive"}/> */}
    </Container>

)};

export default NavBar;