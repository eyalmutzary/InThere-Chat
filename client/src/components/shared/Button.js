import styled from 'styled-components';

export const Button = styled.button`
  /* width: 40vw; */
  font-size: 1.5rem;
  background-color: ${({theme}) => theme.colors.main1};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px 12px 24px;
  margin: 20px;
  cursor: pointer;

`;