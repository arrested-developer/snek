import React from 'react';

import { FullScreenWrapper, MessageContainer } from './Message.styles';

const Message = props => (
  <FullScreenWrapper>
    <MessageContainer>{props.children}</MessageContainer>
  </FullScreenWrapper>
);

export default Message;
