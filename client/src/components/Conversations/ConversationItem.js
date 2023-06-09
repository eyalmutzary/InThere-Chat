import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import { useSelector } from 'react-redux';
import { Icon } from '../shared';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
    justify-content: space-between;
  /* border-top: 1px solid ${({ theme }) => theme.colors.main1}; */
  padding: 12px 20px 12px 20px;
  margin: 8px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 100px;
`;
const Image = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 12px;
`;
const ChatTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    /* padding:; */
`;
const ChatSubtitle = styled.div`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.darkGray};
`;
const Notification = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: ${({ theme }) => theme.colors.main2};
    border-radius: 100px;
    width: fit-content;
    padding: 8px;
    margin: 12px;
`;

const RowWrapper = styled.div`
    display: flex;
    width: fit-content;
    flex-direction: row;
    align-items: center;
    `;

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: space-between; */
    `;

const BoldName = styled.span`
    font-weight: bold;
    margin-right: 8px;
`;
const TimeAgo = styled.div`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.darkGray};
    /* margin-right: 8px; */
    `;

function ConversationItem({ title, notificationsAmount }) {
  // const user = useSelector((state) => state.auth);
  // const [image, setImage] = useState('');

  // TODO: uncomment to get real photos
  //   useEffect(() => {
  //     console.log(user.currentLocation)
  //     axios.get(`https://api.unsplash.com/search/photos?query=${title}&client_id=${photoAPIkey}`)
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
      <RowWrapper>
        {/* <Image src={image} /> */}
        <Image src="https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400" />
        <ColumnWrapper>
          <ChatTitle>{title}</ChatTitle>
          <ChatSubtitle><BoldName>Eyal:</BoldName>lorem ipsum</ChatSubtitle>
        </ColumnWrapper>
      </RowWrapper>

      <RowWrapper>
        <ColumnWrapper>
          {notificationsAmount > 0 && <Notification>{notificationsAmount}</Notification>}
          <TimeAgo>5 min</TimeAgo>
        </ColumnWrapper>
        <Icon name="chevron-right" />
      </RowWrapper>
    </Container>

  );
}

export default ConversationItem;
