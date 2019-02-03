import React from 'react';
import styled from 'styled-components';

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  background: black;
  color: white;
  font-size: 36px;
  padding: 16px;
`;

const Message = props => (
  <FullScreenWrapper>
    <MessageContainer>{props.children}</MessageContainer>
  </FullScreenWrapper>
);

export default Message;
