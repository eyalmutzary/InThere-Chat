import React from 'react';
import styled from 'styled-components';
import {Icon} from '../shared';

const TextInput = styled.textarea`
  border-radius: 30px;
  background-color: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.mainText};
  margin: 4px 12px;
  padding: 8px;
  border: none;
  font-size: 16px;
  width: 100%;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 100%;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 50px;

`;

const SendButton = styled.button`
  color: ${({theme}) => theme.colors.white};
  background: ${({theme}) => theme.colors.unique2};
  border-radius: 50%;
  border: none;
  font-size: 1.2em;
  margin: 8px;
  padding: 20px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.02s, transform 0.05s;

  &:active {
    background-color: ${({theme}) => darkenColor(theme.colors.unique2, 20)};
    transform: scale(0.95); /* Optional: Slightly reduce the size when pressed */
  }
`;
const darkenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + ((R < 255 ? (R < 1 ? 0 : R) : 255) * 0x010000
    + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x000100
    + (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x000001).toString(16);
};
function Input({setMessage, sendMessage, message}) {
  return (
    <Form>
      <TextInput
        // type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({target: {value}}) => setMessage(value)}
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <SendButton className="sendButton" onClick={(e) => sendMessage(e)}>
        <Icon name="paper-plane"/>
      </SendButton>
    </Form>
  );
}

export default Input;
