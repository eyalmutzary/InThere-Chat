import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';
import { Icon } from '../shared';
import styled from "styled-components";

const BackIcon = styled(Icon)`
  padding-right: 12px;
  color: white;
`


const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">

      {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      <a href="/"><BackIcon name={"chevron-left"} />   </a>
      {/* <BackIcon name={"chevron-left"} />       */}
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <BackIcon name={"ellipsis-h"} />
    </div>
  </div>
);

export default InfoBar;