import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../shared';
import faceBookLogo from '../../assets/facebookLogo.png';
import instagramIcon from '../../assets/instagramIcon.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px 12px 12px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const ContentContainer = styled(ContainerCard)`
  background-color: ${({ theme }) => theme.colors.main3};
  color: ${({ theme }) => theme.colors.black};
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 20px;
`;

const OriginFrom = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.darkGray};
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

const CircleButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
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
  color: ${({ theme }) => theme.colors.black};
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
  color: ${({ theme }) => theme.colors.black};
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

const BackIcon = styled(Icon)`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.black};
  margin: 20px 0 0 20px;
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

function ProfilePage() {
  const navigate = useNavigate();

  const getRandomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], []);

  const Tags = dummyTags.map((tag) => (
    <Tag key={tag.id} color={getRandomColor()}>
      {tag.name}
    </Tag>
  ));

  return (
    <>
      <BackIcon name="arrow-left" onClick={() => navigate(-1)} />
      <Container>
        <ProfileContainer>
          <ProfileImage src="https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=430&q=80" />
          <ProfileName>Aria Johnson</ProfileName>
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
        </ProfileContainer>

        <ContentContainer>
          {/* <Title>Level 3: Long tripper</Title>
          <RowWrapper>
            <ProgressBarWrapper>
              <ProgressBar percentage={50} />
            </ProgressBarWrapper>
            <Precentage>50%</Precentage>
          </RowWrapper> */}
        </ContentContainer>

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

export default ProfilePage;
