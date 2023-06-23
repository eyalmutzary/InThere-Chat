import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// import onlineIcon from '../../icons/onlineIcon.png';
// import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';
import { Icon } from '../shared';

const BackIcon = styled(Icon)`
  padding-right: 12px;
  color: white;
`;

const Container = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.main2};
  border-radius: 4px 4px 0 0;
  /* height: 60px; */
  padding: 12px;
  width: 100%;
`;

const HeartIcon = styled(Icon)`
  margin-right: 30px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.3rem;
`;

const RightWrapper = styled.div`
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
const LeftInnerContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  min-width: fit-content;
  margin-left: 5%;
  color: white;
  `;

function InfoBar({ setRoomDetailsModal }) {
  // const [image, setImage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const eventName = searchParams.get('eventName') ?? '';
  const room = searchParams.get('room');

  // TODO: uncomment to get real photos
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
      <LeftInnerContainer>
        <Link onClick={null} to="/main">
          <BackIcon name="chevron-left" />
        </Link>
        <Image src="https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400" />
        <RoomTitle>{eventName ? eventName : room}</RoomTitle>
      </LeftInnerContainer>
      <RightWrapper>
        <HeartIcon name="heart" onClick={() => {}} />
        <BackIcon name="ellipsis-h" onClick={() => setRoomDetailsModal(true)} />
      </RightWrapper>
    </Container>
  );
}

export default InfoBar;
