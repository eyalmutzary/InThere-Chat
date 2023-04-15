import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';
import { Icon } from '../shared';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const BackIcon = styled(Icon)`
  padding-right: 12px;
  color: white;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({theme}) => theme.colors.main3};
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
`


const InfoBar = ({ room, setRoomDetailsModal }) => (
  <Container>
    <div className="leftInnerContainer">

      {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      <Link onClick={null} to={`/main`}>
        <BackIcon name={"chevron-left"} />
      </Link>
      {/* <BackIcon name={"chevron-left"} />       */}
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <BackIcon name={"ellipsis-h"} onClick={() => setRoomDetailsModal(true)}/>
    </div>
  </Container>
);

export default InfoBar;