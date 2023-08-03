import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Icon } from '../shared';
import faceBookLogo from '../../assets/facebookLogo.png';
import instagramIcon from '../../assets/instagramIcon.png';
import { useSelector } from 'react-redux';
import { firestore } from '../../firebase';

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
  flex-direction: column;
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
  width: 100%;
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

// const dummyTags = [
//   {
//     id: 1,
//     name: 'Travel',
//   },
//   {
//     id: 2,
//     name: 'Food',
//   },
//   {
//     id: 3,
//     name: 'Music',
//   },
//   {
//     id: 4,
//     name: 'Art',
//   },
//   {
//     id: 5,
//     name: 'Sport',
//   },
//   {
//     id: 6,
//     name: 'Nature',
//   },
// ];

const DUMMY_IMAGE = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
const WHATAPP_PREFIX = 'https://wa.me/';

function Profile() {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get('uid');

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .where('uid', '==', uid)
      .onSnapshot((snapshot) => {
        const user = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserDetails(user[0] ?? {});
      });

    return () => unsubscribe();
  }, []);

  const getRandomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], []);

  const Tags = userDetails?.intrests?.map((tag) => (
    <Tag key={tag} color={getRandomColor()}>
      {tag}
    </Tag>
  ));

  console.log(userDetails)

  return (
    <>
      {uid === userDetails?.uid && <EditButton onClick={() => navigate(`/edit-profile?uid=${userDetails.uid}`)}><Icon name={'pen'}/></EditButton>}
      <IconRowWrapper>
        <Icon name="arrow-left" onClick={() => navigate("/main")} />
      </IconRowWrapper>
      <Container>
        <ProfileContainer>
          <ProfileImage src={userDetails?.photoURL || DUMMY_IMAGE} />
          <ColumnWrapper>
            {userDetails?.name ? <ProfileName>{userDetails.name}</ProfileName> : <ProfileName>Loading...</ProfileName>}
            {(userDetails?.nationality || userDetails?.language) && <OriginFrom>
              <Icon name="globe" />
              &nbsp;&nbsp;{userDetails?.nationality ? userDetails?.nationality+', ' : ''}{userDetails?.language || ''}
            </OriginFrom>}
            <RowWrapper>
              { userDetails?.phone && <CircleButton onClick={() => window.open(WHATAPP_PREFIX + userDetails.phone, "_blank")}>
                <Icon name="comment" />
              </CircleButton>}
              { userDetails?.instagramUrl &&<CircleButton onClick={() => window.open(userDetails.instagramUrl, "_blank")}>
                <IconImage src={instagramIcon} />
              </CircleButton>}
              { userDetails?.facebookUrl &&<CircleButton onClick={() => window.open(userDetails.facebookUrl, "_blank")}>
                <IconImage src={faceBookLogo} />
              </CircleButton>}
            </RowWrapper>
          </ColumnWrapper>
        </ProfileContainer>

        {userDetails?.about && <ContentContainer>
          <Title>About Me</Title>
          <Text>
            {userDetails.about}
          </Text>
        </ContentContainer> }
        {userDetails?.intrests && <TagsContainer>{Tags}</TagsContainer>}
      </Container>
    </>
  );
}

export default Profile;
