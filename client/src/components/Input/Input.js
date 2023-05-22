import React from 'react';
import styled from 'styled-components';
import { Icon } from '../shared';
import './Input.css';

const TextInput = styled.input`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
  margin: 8px;
  padding: 8px;
  border: none;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Form = styled.form`
  display: flex;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);
`;

const SendButton = styled.button`
  color: ${({ theme }) => theme.colors.white} !important;
  background: ${({ theme }) => theme.colors.main2};
  //display: inline-block;
  border: none;
  border-radius: 50%;
  font-size: 1.2em;
  margin: 8px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Input({ setMessage, sendMessage, message }) {
  return (
    <Form>
      <TextInput
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
      />
      <SendButton className="sendButton" onClick={(e) => sendMessage(e)}><Icon name="paper-plane" /></SendButton>
    </Form>
  );
}

export default Input;
