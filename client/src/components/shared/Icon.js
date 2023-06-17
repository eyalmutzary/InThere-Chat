import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
  faUsers,
  faArchive,
  faUser,
  faTimes,
  faComment,
  faPaperPlane,
  faGlobe,
  faHeart,
  faCommentMedical,
  faArrowLeft,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

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
  faPaperPlane,
  faGlobe,
  faHeart,
  faCommentMedical,
  faArrowLeft,
  faRightFromBracket,
);

const IconWrapper = styled.div``;

function Icon({ name, ...rest }) {
  return (
    <IconWrapper {...rest}>
      <FontAwesomeIcon icon={name} />
    </IconWrapper>
  );
}

export default Icon;
