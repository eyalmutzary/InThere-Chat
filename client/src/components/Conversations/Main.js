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
    justify-content: space-between;
    background-image: url("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
    background-size: cover;
    position: relative;
    height: 30svh;
    margin: 12px;
    border-radius: 30px;


`
const SubTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 12px;
`
const ContentContainer = styled.div`
    padding-bottom: 50px;
`


const ButtonEnterChat = styled.div`
    /* background-color: transparent; */
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    font-size: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 8px 16px 8px 16px;
    border-radius: 100px;
    margin-bottom: 20px;

    /* border-radius: 0;
    padding: 8px;
    display: flex;
    flex-direction: row;
    font-size: 1.5rem; */

`
const Image = styled.img`
    width: 100vw;
    padding:40px;
`
const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SearchInput = styled.input`
    border-radius: 100px;
    padding: 12px;
    border: none;
    background-color: ${({theme}) => theme.colors.lightGray};
    width: 100%;
    margin: 8px;
    font-size: 24px;
`
const AddButton = styled.button`
    color: ${({theme}) => theme.colors.darkGray};
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 28px;
    /* width: 60px;
    height: auto; */
    padding: 12px;
    border-radius: 1000px;
    border: none;
    background-color: ${({theme}) => theme.colors.lightGray};
    margin: 8px;
`
const Location = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* blurred half transparent white background */
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    width: fit-content;
    font-size: 20px;
    padding: 8px;
    border-radius: 8px;
`
const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
`
const Text = styled.div`    
    font-size: 24px;
    font-weight: bold;
    margin-top: 8px;
`
const SubText = styled.div`
    font-size: 18px;
    /* margin: 12px; */
    color: ${({theme}) => theme.colors.darkGray};
`
const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100px;
    margin: 12px;
    object-fit: cover;
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

            <ProfileWrapper onClick={()=> history.push('/profile')}>
                <ProfileImage src={"https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=430&q=80"}/>
                <ColumnWrapper>
                    <SubText>Welcome back,</SubText>
                    <Text>Jordana Moore</Text>
                </ColumnWrapper>
            </ProfileWrapper>

            <CurrentPlaceWrapper location={user.currentLocation}>
                {/* <PlaceImage src={image} /> */}
                {/* <PlaceImage src={"https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400"} /> */}
                {/* <Text>Currently in: <strong>{user.currentLocation}</strong></Text> */}
                <Location>You're in {user.currentLocation}</Location>
                {/* <Link onClick={e => (!user.name || !user.currentLocation || !user.phoneNumber) ? e.preventDefault() : null} to={`/chat?name=${user.name}&room=${user.currentLocation}`}> */}
                    <ButtonEnterChat onClick={() => history.push(`/chat?name=${user.name}&room=${user.currentLocation}`)}>Enter Chat! &nbsp;&nbsp;<Icon name={"chevron-right"}/></ButtonEnterChat>
                {/* </Link> */}
            </CurrentPlaceWrapper>

            <RowWrapper>
                <SearchInput placeholder={"Search..."}/>
                <AddButton><Icon name={"comment-medical"} /></AddButton>
            </RowWrapper>
            
            {ConversationItems}
        </ContentContainer>}

        {/* {currentTab === TABS_OPTIONS.PRIVATES && 
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
        </ContentContainer>} */}
    </Container>

)};

export default Main;