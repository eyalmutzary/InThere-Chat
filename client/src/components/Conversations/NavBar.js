import React, { } from 'react';
import styled from 'styled-components';
import { Icon } from '../shared';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.main1};

    width: 100%;
    position: fixed;
    bottom: 0;
`;

const NavButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-top: 3px solid ${({ theme, isSelected }) => (isSelected ? theme.colors.main2 : theme.colors.white)};
    /* background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.main2 : theme.colors.white)}; */
    /* color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.main2)}; */
    cursor: pointer;
    width: 100%;
    font-size: 1.5rem;
    padding: 12px;
`;

export const TABS_OPTIONS = {
  GROUPS: 'groups',
  PRIVATES: 'privates',
  ARCHIVE: 'archive',
};

function NavBar({ currentTab, setCurrentTab }) {
  return (
    <Container>
      <NavButton isSelected={currentTab === TABS_OPTIONS.GROUPS} onClick={() => setCurrentTab(TABS_OPTIONS.GROUPS)}>
        <Icon name="users" />
      </NavButton>
      <NavButton isSelected={currentTab === TABS_OPTIONS.PRIVATES} onClick={() => setCurrentTab(TABS_OPTIONS.PRIVATES)}>
        <Icon name="user" />
      </NavButton>
      <NavButton isSelected={currentTab === TABS_OPTIONS.ARCHIVE} onClick={() => setCurrentTab(TABS_OPTIONS.ARCHIVE)}>
        <Icon name="archive" />
      </NavButton>
    </Container>

  );
}

export default NavBar;
