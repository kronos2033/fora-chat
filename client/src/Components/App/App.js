/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import reducer from '../../hooks/reducer';
import socket from '../../utils/socket';
import Chat from '../Chat/Chat';
import Entrance from '../Entrance/Entrance';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    chatId: null,
    username: null,
    users: [],
    messages: [],
  });

  useEffect(() => {
    socket.on('join in chat', connectUser);
    socket.on('new message', addMessage);
    socket.on('disconnect user', disconnectUser);
  }, []);

  const connectUser = (obj) => {
    dispatch({
      type: 'set data',
      payload: obj,
    });
  };

  const disconnectUser = (user) => {
    dispatch({
      type: 'disconnect user',
      payload: user,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'new messages',
      payload: message,
    });
  };
  const onJoinUser = async (obj) => {
    dispatch({
      type: 'join',
      payload: obj,
    });
    socket.emit('join user', obj);
  };

  return (
    <div>
      {!state.joined ? <Entrance onJoin={onJoinUser} /> : <Chat {...state} />}
    </div>
  );
}

export default App;
