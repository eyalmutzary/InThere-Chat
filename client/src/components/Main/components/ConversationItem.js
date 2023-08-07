import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import 'react-phone-number-input/style.css';
import {Icon} from '../../shared';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {photoAPIkey} from "../../shared/constants";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin: 12px;
  background-color: ${({theme}) => theme.colors.subContainer};
  border-radius: 50px;
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
`;
const ChatSubtitle = styled.div`
  font-size: 1rem;
  color: ${({theme}) => theme.colors.nonMainText};
`;
const Notification = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: ${({theme}) => theme.colors.main2};
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
`;

const BoldName = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;
const TimeAgo = styled.div`
  font-size: 1rem;
  color: ${({theme}) => theme.colors.nonMainText};
`;

function ConversationItem({title, notificationsAmount, eventId, room}) {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios.get(`https://api.unsplash.com/search/photos?query=${title.replace(/ /g, '-')}&client_id=${photoAPIkey}`)
      .then((response) => {
        if (response.data.results.length > 0) {
          setImage(response.data.results[0].urls.small);
        } else {
          console.log("No results found.");
          // Optionally, set a default image URL when no results are found:
          setImage("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        // Optionally, set a default image in case of an error:
        setImage("https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MzMwMjZ8MHwxfHNlYXJjaHwxfHxOZXclMjBZb3JrfGVufDB8fHx8MTY4MDg3MjcwMA&ixlib=rb-4.0.3&q=80&w=400");
      });
  }, [user.location]);

  // style={style}
  return (
    <Container onClick={() => navigate(`/chat?room=${room}&eventId=${eventId}&eventName=${title}`)}>
      <RowWrapper>
        <Image src={image}/>
        <ColumnWrapper>
          <ChatTitle>{title}</ChatTitle>
          {/*<ChatSubtitle><BoldName>Eyal:</BoldName>lorem ipsum</ChatSubtitle>*/}
        </ColumnWrapper>
      </RowWrapper>

      <RowWrapper>
        <ColumnWrapper>
          {notificationsAmount > 0 && <Notification>{notificationsAmount}</Notification>}
          {/*<TimeAgo>5 min</TimeAgo>*/}
        </ColumnWrapper>
        <Icon name="chevron-right"/>
      </RowWrapper>
    </Container>

  );
}

export default ConversationItem;
