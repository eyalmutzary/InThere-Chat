import React, {useEffect, useRef, useState} from 'react';
import MessageWrapper from "./MessageTypes/MessageMeta";
import styled from 'styled-components';


const Container = styled.div`
  //padding: 4px 0;
  overflow-y: scroll;
  //height: 100%;
  //width: 100%;
  flex: 1;

`;

function Messages({messages, events}) {
  const [combinedMessages, setCombinedMessages] = useState([]);
  const messagesContainerRef = useRef();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({behavior: 'instant'});
    }
  };

  const mergeAndSortMessages = () => {
    const mergedArray = [...messages, ...events];
    mergedArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setCombinedMessages(mergedArray);
  };

  useEffect(() => {
    mergeAndSortMessages();
  }, [messagesContainerRef, messages, events]);

  useEffect(() => {
    scrollToBottom();
  }, [combinedMessages]);

  return (
    <Container>
      {combinedMessages.map((data, index) => (
        <MessageWrapper
          data={data}
          index={index}
        />
      ))}
      <div style={{float: "left", clear: "both"}} ref={messagesContainerRef}/>
    </Container>
  );
}

export default Messages;
