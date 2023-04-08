// import React, { useEffect, useMemo, useState } from 'react';
// import { Button, Icon } from '../shared';
// import styled from "styled-components";
// // import TextField from '@mui/material/TextField';
// import 'react-phone-number-input/style.css'
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';
// import { authActions } from '../shared/store';
// import ConversationItem from './ConversationItem';


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   background-color: #e6f3ff;
// `

// const TopBar = styled.div`
//     background-color: gray;
//     height: 1000px;
// `

// const PlaceImage = styled.img`
//     border-radius: 50%;
//     object-fit: cover;
//     height: 250px;
//     width: 250px;
//     margin: 12px;
//     border: 6px solid ${({theme}) => theme.colors.main1};
// `

// const CurrentPlaceWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     background-color: white;
//     border: 1px solid gray;
//     border-radius: 8px;
//     margin: 20px;
//     /* padding: 12px; */
// `

// const Text = styled.div`
//     font-size: 1.5rem;
//     /* font-weight: bold; */
// `
// const SubTitle = styled.div`
//     font-size: 24px;
//     font-weight: bold;
//     margin: 12px;
// `

// const accessKey = 'lEu62fkcS8hU5TQF0QubLhammumwxIwli2CEthFsYvo';

// // Dummy data
// const ConversationItemsDummyData = [
//     {
//         title: "New York",
//         notificationsAmount: 3,
//     }, {
//         title: "Boston",
//         notificationsAmount: 12,
//     }, {
//         title: "Los Angeles",
//         notificationsAmount: 7,
//     }, {
//         title: "San Francisco",
//         notificationsAmount: 0,
//     }, {
//         title: "Seattle",
//         notificationsAmount: 0,
//     }, {
//         title: "Chicago",
//         notificationsAmount: 0,
//     }, {
//         title: "Miami",
//         notificationsAmount: 0,
//     }
// ]

// const ConversationList = ({history}) => {
//     // const cityName = 'New York'; // replace with the name of the city you want to get photos of
//     const [image, setImage] = useState("")
//     const user = useSelector(state => state.auth)

//     const dispatch = useDispatch()

//     useEffect(() => {    
//         const serializedUser = localStorage.getItem("auth");
//         if (serializedUser === null) {
//           return history.push("/login");
//         }
//         const user = JSON.parse(serializedUser);          
//           dispatch(authActions.login(
//             {name: user.name, 
//             phoneNumber: user.phoneNumber, 
//             currentLocation: user.currentLocation}))
//     },[])

//     const ConversationItems = ConversationItemsDummyData.map((item) => 
//         <ConversationItem key={item.title} title={item.title} notificationsAmount={item.notificationsAmount} />
//     )
//     // TODO: UNCOMMENT THIS TO GET THE IMAGE OF THE CURRENT LOCATION
//     // useEffect(() => {
//     //     console.log(user.currentLocation)
//     //     axios.get(`https://api.unsplash.com/search/photos?query=${user.currentLocation}&client_id=${accessKey}`)
//     //         .then((response) => {
//     //             setImage(response.data.results[0].urls.small)
//     //             console.log(response.data.results); // display the photos in the console
//     //         })
//     //         .catch((error) => {
//     //         console.log(error);
//     //         });
//     // },[user.currentLocation])

//     return (
//     <Container>
//         <TopBar>Some Content Here</TopBar>
//         <CurrentPlaceWrapper>
//             {/* <PlaceImage src={image} /> */}
//             <PlaceImage src={"https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400"} />
//             <Text>Currently in: <strong>{user.currentLocation}</strong></Text>
//             <Link onClick={e => (!user.name || !user.currentLocation || !user.phoneNumber) ? e.preventDefault() : null} to={`/chat?name=${user.name}&room=${user.currentLocation}`}>
//                 <Button>Enter Chat!</Button>
//             </Link>
//         </CurrentPlaceWrapper>

//         <SubTitle>All conversations:</SubTitle>
//         {ConversationItems}
//     </Container>

// )};

// export default ConversationList;