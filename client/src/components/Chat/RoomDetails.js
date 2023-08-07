import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Icon} from '../shared';
import 'react-phone-number-input/style.css';
import {firestore} from "../../firebase";
import {useNavigate} from 'react-router';
import {useSelector} from "react-redux";

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
  }
`;
const ModalWrapper = styled.div`
  position: relative;
  z-index: 11;
  width: 100%;
  max-width: 90vw;
  max-height: 70vh;
  overflow: auto;
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 3px;
  color: ${({theme}) => theme.colors.black};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    /* height: 100%; */
    max-height: 80%;
    overflow: auto;
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
  border-bottom: 2px solid ${({theme}) => theme.colors.subContainer};
`;
const Title = styled.div`
  font-size: 1.5rem;
`;

const SecondTitle = styled.div`
  font-size: 1.2rem;
  padding: 0 12px;
`;

const Description = styled.p`
  font-size: 1rem;
  padding: 8px 28px;
  background-color: ${({theme}) => theme.colors.unique2};
  border-radius: 20px;
`;

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 8px;
  background-color: ${({theme}) => theme.colors.unique1};
  border-radius: 50px;
  margin: 8px;
`;
const MemberDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
`;
const MemberImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;
const MemberName = styled.div`
  font-size: 1.4rem;
`;
const MemberLastSeen = styled.div`
  font-size: 0.8rem;
  /* margin: 8px; */
  color: ${({theme}) => theme.colors.nonMainText};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 8px;
  padding: 8px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.unique1};
`;

const DUMMY_IMAGE = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

function RoomDetails({setRoomDetailsModal}) {
  const [roomMembers, setRoomMembers] = React.useState([]);
  const [eventDescription, setEventDescription] = React.useState(''); // Step 1
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId') ?? '';
  const room = searchParams.get('room');
  const navigate = useNavigate();
  const eventName = searchParams.get('eventName') ?? '';
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let firestoreQuery = firestore.collection('users');
    if (eventId) {
      firestore
        .collection('Events')
        .doc(eventId)
        .get()
        .then((eventDoc) => {
          if (eventDoc.exists) {
            const eventData = eventDoc.data();
            setEventDescription(eventData.description || ''); // Step 2
            const eventMembers = eventData.members || [];
            firestoreQuery = firestoreQuery.where('id', 'in', eventMembers);
            // Execute the query and listen for real-time updates
            const unsubscribe = firestoreQuery.onSnapshot((snapshot) => {
              const members = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setRoomMembers(members);
            });
          } else {
            console.log("Event not found.");
          }
        })
        .catch((error) => {
          console.log("Error fetching event document:", error);
        });
    } else {
      firestoreQuery = firestoreQuery.where('location', '==', room);
      const unsubscribe = firestoreQuery.onSnapshot((snapshot) => {
        const members = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoomMembers(members);
      });
    }
  }, []);

  const handleLeave = () => {
    const eventsCollection = firestore.collection('Events');
    const eventRef = eventsCollection.doc(eventId);

    eventRef
      .get()
      .then((eventDoc) => {
        if (eventDoc.exists) {
          const eventMembers = eventDoc.data().members || [];

          const userIndex = eventMembers.indexOf(user.uid);

          if (userIndex !== -1) {
            eventMembers.splice(userIndex, 1);
            return eventRef.update({
              members: eventMembers,
            });
          } else {
            console.log("User not found in the event members list.");
          }
        } else {
          console.log("Event not found.");
        }
      })
      .then(() => {
        console.log("Successfully left the event.");
        navigate('/home');
      })
      .catch((error) => {
        console.error("Error leaving the event: ", error);
      });
  };

  const membersList = roomMembers && roomMembers.map(({uid, name, photoURL, phone}) => (
    <MemberWrapper key={uid} onClick={() => navigate(`/profile?uid=${uid}`)}>
      <MemberImage src={photoURL || DUMMY_IMAGE}/>
      <MemberDetailsWrapper>
        <MemberName>{name}</MemberName>
        {/* <MemberLastSeen>{phone}</MemberLastSeen> */}
      </MemberDetailsWrapper>
    </MemberWrapper>


  ));
  return (
    <Backdrop>
      <ModalWrapper>
        <TopWrapper>
          <Title>{eventName ? eventName : room}</Title>
          {eventId && <Icon onClick={handleLeave} name="fa-right-from-bracket"/>}
          <Icon name="times" onClick={() => setRoomDetailsModal(false)}/>
        </TopWrapper>
        {eventId && eventDescription && (
          <DescriptionWrapper>
            <SecondTitle>Event Description:</SecondTitle>
            <Description>{eventDescription}</Description>
          </DescriptionWrapper>
        )}

        <SecondTitle>Group Members</SecondTitle>
        {membersList}
      </ModalWrapper>
    </Backdrop>
  );
}

export default RoomDetails;
