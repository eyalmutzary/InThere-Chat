import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../shared';
import faceBookLogo from '../../assets/facebookLogo.png';
import instagramIcon from '../../assets/instagramIcon.png';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 40px;
`;

const ContainerCard = styled.div`
  margin: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 100%;
  padding: 12px;
`;

const ProfileContainer = styled(ContainerCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.container};
  margin: 20px;
`;

const ContentContainer = styled(ContainerCard)`
  background-color: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.mainText};
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 200px;
  border-radius: 5%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.mainText};
  margin-top: 20px;
`;

const OriginFrom = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.nonMainText};
  margin-top: 8px;
  display: flex;
  flex-direction: row;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CircleButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.unique2};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
`;

const IconImage = styled.img`
  width: 22px;
  height: 22px;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 22px;
  margin-bottom: 12px;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.mainText};
`;

const colors = [
  '#ffd666',
  '#75d7a7',
  '#fb766a',
  '#66a1ff',
  '#ff9ff3',
  '#fc427b',
  '#ff7979',
  '#6ab04c',
];

const Tag = styled.div`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.mainText};
  margin: 8px;
  background-color: ${({ color }) => color};
  padding: 4px 12px;
  border-radius: 100px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const IconRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 30px;
  padding: 20px 20px 0 20px;
`;

const EditButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.unique2};
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  border: 0;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.white};
`;

const dummyTags = [
  {
    id: 1,
    name: 'Travel',
  },
  {
    id: 2,
    name: 'Food',
  },
  {
    id: 3,
    name: 'Music',
  },
  {
    id: 4,
    name: 'Art',
  },
  {
    id: 5,
    name: 'Sport',
  },
  {
    id: 6,
    name: 'Nature',
  },
];

function Profile() {
  const navigate = useNavigate();
  const {name, photoURL} = useSelector((state) => state.auth.user);

  const getRandomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], []);

  const Tags = dummyTags.map((tag) => (
    <Tag key={tag.id} color={getRandomColor()}>
      {tag.name}
    </Tag>
  ));

  return (
    <>
      <EditButton onClick={() => navigate('/edit-profile')}><Icon name={'pen'}/></EditButton>
      <IconRowWrapper>
        <Icon name="arrow-left" onClick={() => navigate(-1)} />
      </IconRowWrapper>
      <Container>
        <ProfileContainer>
          <ProfileImage src={photoURL} />
          <ColumnWrapper>
          <ProfileName>{name}</ProfileName>
          <OriginFrom>
            <Icon name="globe" />
            &nbsp;&nbsp;Israel, Hebrew
          </OriginFrom>
          <RowWrapper>
            <CircleButton>
              <Icon name="comment" />
            </CircleButton>
            <CircleButton>
              <IconImage src={instagramIcon} />
            </CircleButton>
            <CircleButton>
              <IconImage src={faceBookLogo} />
            </CircleButton>
          </RowWrapper>
          </ColumnWrapper>
        </ProfileContainer>

        <ContentContainer>
          <Title>About Me</Title>
          <Text>
            I'm Aria, an adventurous girl on a long journey to meet new people and make unforgettable memories. Join me!
          </Text>
        </ContentContainer>
        <TagsContainer>{Tags}</TagsContainer>
      </Container>
    </>
  );
}

export default Profile;
