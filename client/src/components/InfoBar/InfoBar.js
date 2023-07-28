import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';
import {Icon} from '../shared';

const Container = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: row;
  background: ${({theme}) => theme.colors.subContainer};
  color: ${({theme}) => theme.colors.mainText};
  border-radius: 4px 4px 0 0;
  padding: 12px;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  background: none;
`;

const BasicIcon = styled(Icon)`
  padding-right: 12px;
  font-size: 1.5rem;
`;

const RoomDetails = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;


const RoomTitle = styled.span`
  font-size: 1.4rem;
  min-width: fit-content;
`;
const Image = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-right: 12px;
  object-fit: cover;
`;

function InfoBar({setRoomDetailsModal}) {
  // const [image, setImage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const eventName = searchParams.get('eventName') ?? '';
  const room = searchParams.get('room');

  // TODO: uncomment to get real photos  (Gilad ignore this comment)
  //   useEffect(() => {
  //     console.log(user.location)
  //     axios.get(`https://api.unsplash.com/search/photos?query=${title}&client_id=${photoAPIkey}`)
  //         .then((response) => {
  //             setImage(response.data.results[0].urls.small)
  //             console.log(response.data.results); // display the photos in the console
  //         })
  //         .catch((error) => {
  //         console.log(error);
  //         });
  // },[user.location])

  return (
    <Container>
      {/*<LeftInnerContainer>*/}
      <Button>
        <BasicIcon onClick={() => navigate("/main")} name="chevron-left"/>

      </Button>
      <RoomDetails onClick={() => setRoomDetailsModal(true)}>
        <Image
          src="https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400"/>
        <RoomTitle>{eventName ? eventName : room}</RoomTitle>
      </RoomDetails>
      {/*</LeftInnerContainer>*/}
    </Container>
  );
}

export default InfoBar;
