import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import Header from '../header/Header';

export default function Chat() {
  return (
    <React.Fragment>
      <ChatEngine
        height="100vh"
        projectID="c4d92bb6-de3a-496d-9c57-99a28ff1f2c3"
        userName="admin"
        userSecret="minhhieu"
      />
    </React.Fragment>
  );
}
