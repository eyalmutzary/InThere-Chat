import React from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${({theme}) => theme.colors.lightGray};
  border-radius: 8px;
  //padding: 8px 16px;
  padding-right: 12px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
`;

const SubText = styled.div`
  font-size: 18px;
  color: ${({theme}) => theme.colors.darkGray};
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin: 12px;
  object-fit: cover;
`;

const ProfileButton = ({onClick}) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <ProfileWrapper onClick={onClick}>
      <ProfileImage src={user.photoURL}/>
      <ColumnWrapper>
        <SubText>Welcome back,</SubText>
        <Text>{user.name}</Text>
      </ColumnWrapper>
    </ProfileWrapper>
  );
};

export default ProfileButton;
