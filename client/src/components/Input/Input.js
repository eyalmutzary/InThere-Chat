import React from 'react';
import { Icon } from '../shared';

import './Input.css';

import styled from "styled-components";

const TextInput = styled.input`
  border-radius: 8px;
  background-color: #F3F3F3;
  width: 100%;
  margin: 8px;
  padding: 8px;
  border: none;
  font-size: 1.2em;
  display: flex;
  align-items: center;

`

const Form = styled.form`
  display: flex;
  border-top: 2px solid #D3D3D3;
`

const SendButton = styled.button`
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #2979FF;
    padding: 20px;
    display: inline-block;
    border: none;
    width: 20%;
    `

const Input = ({ setMessage, sendMessage, message }) => (
  <Form>
    {/* <TextInput type={"text"}/> */}
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <SendButton className="sendButton" onClick={e => sendMessage(e)}>SEND</SendButton>
  </Form>
)

export default Input;