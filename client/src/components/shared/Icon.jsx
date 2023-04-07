import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, 
  faXbox,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
    faChevronLeft,
    faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    fab,
    faChevronLeft,
    faCheck,
    faEllipsisH,    
    );

const IconWrapper = styled.div``;


const Icon = ({ name, ...rest }) => (
  <IconWrapper {...rest}>
    <FontAwesomeIcon icon={name} />
  </IconWrapper>
);

export default Icon;