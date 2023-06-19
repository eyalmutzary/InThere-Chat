import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import { Icon } from '../../shared';
import { auth} from '../../../firebase';
import { useNavigate } from 'react-router';
import { authActions } from '../../shared/store';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${({theme}) => theme.colors.lightGray};
  border-radius: 100px;
  //padding: 8px 16px;
  padding-right: 12px;
  margin: 12px 22px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({theme}) => theme.colors.lightGray};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const LogoutText = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 8px; /* Added margin to create space between text and icon */
`;

const LogoutIcon = styled(Icon)`
  font-size: 24px;
`;

const LogoutWrapper = styled.div``;

const ProfileButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        dispatch(authActions.clearUser());
        navigate('/signin');
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };
  
  return (
    <ProfileWrapper>
      <ProfileImage src={user.photoURL}/>
      <ColumnWrapper onClick={() => navigate('/profile')}>
        <SubText>Welcome back,</SubText>
        <Text>{user.name}</Text>
      </ColumnWrapper>
      <LogoutWrapper onClick={handleLogout}>
        {/* <LogoutText><Icon name={"logout"}/></LogoutText> */}
        <LogoutIcon name="fa-right-from-bracket"/>
      </LogoutWrapper>
    </ProfileWrapper>
  );
};

export default ProfileButton;
