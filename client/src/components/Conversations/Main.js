import React, { useEffect, useState } from 'react';
import { Button, Icon } from '../shared';
import styled from "styled-components";
// import TextField from '@mui/material/TextField';
import 'react-phone-number-input/style.css'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../shared/store';
import ConversationItem from './ConversationItem';
import NavBar from './NavBar';
import { photoAPIkey } from '../shared/constants';
import { default as ProfilePage } from '../ProfilePage/profilePage';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.black};

`
const CurrentPlaceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background-image: url("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
    background-size: cover;
    position: relative;
    height: 40vh;
    padding-bottom: 12px;
    margin-bottom: 36px;
    &:before {
    content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(to top, rgba(0,0,0,1.5) 0%, transparent 100%);
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;

`

const Text = styled.div`
    font-size: 1.5rem;
    z-index: 1;
    color: ${({theme}) => theme.colors.white};
    /* font-weight: bold; */
`
const SubTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 12px;
`
const ContentContainer = styled.div`
    padding-bottom: 50px;
`

const ZLink = styled(Link)`
    z-index: 1;
`

const ButtonEnterChat = styled(Button)`
    /* width: 40vw; */ 
    background-color: transparent;
    border-bottom: 4px solid ${({theme}) => theme.colors.main1};
    border-radius: 0;
    padding: 8px;
    display: flex;
    flex-direction: row;
    font-size: 1.5rem;

`
const Image = styled.img`
    width: 100vw;
    padding:40px;
`


// Dummy data
const ConversationItemsDummyData = [
    {
        title: "New York",
        notificationsAmount: 3,
    }, {
        title: "Boston",
        notificationsAmount: 12,
    }, {
        title: "Los Angeles",
        notificationsAmount: 7,
    }, {
        title: "San Francisco",
        notificationsAmount: 0,
    }, {
        title: "Seattle",
        notificationsAmount: 0,
    }, {
        title: "Chicago",
        notificationsAmount: 0,
    }, {
        title: "Miami",
        notificationsAmount: 0,
    }
]

export const TABS_OPTIONS = {
    GROUPS: "groups",
    PRIVATES: "privates",
    ARCHIVE: "archive",
}

const Main = ({history}) => {
    // const cityName = 'New York'; // replace with the name of the city you want to get photos of
    const [image, setImage] = useState("")
    const user = useSelector(state => state.auth)
    const [currentTab, setCurrentTab] = useState(TABS_OPTIONS.GROUPS)
    const dispatch = useDispatch()

    useEffect(() => {    
        const serializedUser = localStorage.getItem("auth");
        if (serializedUser === null) {
          return history.push("/login");
        }
        const user = JSON.parse(serializedUser);          
          dispatch(authActions.login(
            {name: user.name, 
            phoneNumber: user.phoneNumber, 
            currentLocation: user.currentLocation}))
    },[])

    const ConversationItems = ConversationItemsDummyData.map((item) => 
        <ConversationItem key={item.title} title={item.title} notificationsAmount={item.notificationsAmount} />
    )
    // TODO: UNCOMMENT THIS TO GET THE IMAGE OF THE CURRENT LOCATION
    // useEffect(() => {
    //     console.log(user.currentLocation)
    //     axios.get(`https://api.unsplash.com/search/photos?query=${user.currentLocation}&client_id=${photoAPIkey}`)
    //         .then((response) => {
    //             setImage(response.data.results[0].urls.small)
    //             console.log(response.data.results); // display the photos in the console
    //         })
    //         .catch((error) => {
    //         console.log(error);
    //         });
    // },[user.currentLocation])

    return (
    <Container>
        {currentTab === TABS_OPTIONS.GROUPS && 
        <ContentContainer>

            <CurrentPlaceWrapper>
                {/* <PlaceImage src={image} /> */}
                {/* <PlaceImage src={"https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400"} /> */}
                {/* <Text>Currently in: <strong>{user.currentLocation}</strong></Text> */}
                <ZLink onClick={e => (!user.name || !user.currentLocation || !user.phoneNumber) ? e.preventDefault() : null} to={`/chat?name=${user.name}&room=${user.currentLocation}`}>
                    <ButtonEnterChat>Enter {user.currentLocation} Chat! &nbsp;&nbsp;<Icon name={"chevron-right"}/></ButtonEnterChat>
                </ZLink>
            </CurrentPlaceWrapper>

            <SubTitle>Active Conversations:</SubTitle>
            {ConversationItems}
        </ContentContainer>}

        {currentTab === TABS_OPTIONS.PRIVATES && 
        <ContentContainer>
            <ProfilePage />
        </ContentContainer>}
        <NavBar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {currentTab === TABS_OPTIONS.ARCHIVE &&
        <ContentContainer>
            <SubTitle>Archive:</SubTitle>
            {ConversationItems}
            {ConversationItems}
            {ConversationItems}
        </ContentContainer>}
    </Container>

)};

export default Main;