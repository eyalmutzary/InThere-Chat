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
    faChevronRight,
    faEllipsisH,
    faUsers,
    faArchive,
    faUser,
    faTimes,
    faComment
} from "@fortawesome/free-solid-svg-icons";

library.add(
    fab,
    faChevronLeft,
    faChevronRight,
    faCheck,
    faEllipsisH, 
    faUsers,
    faArchive,
    faUser,
    faTimes,
    faComment,
    );

const IconWrapper = styled.div``;


const Icon = ({ name, ...rest }) => (
  <IconWrapper {...rest}>
    <FontAwesomeIcon icon={name} />
  </IconWrapper>
);

export default Icon;