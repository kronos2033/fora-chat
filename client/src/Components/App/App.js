/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect } from 'react';
import reducer from '../../hooks/reducer';
import Entrance from '../Entrance/Entrance';
import Chat from '../Chat/Chat';
import socket from '../../utils/socket';
import axios from 'axios';
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
    socket.on('update user', setUsers);
    socket.on('new message', addMessage);
  }, []);

  const setUsers = (users) => {
    dispatch({
      type: 'set users',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'new messages',
      payload: message,
    });
  };
  const onJoin = async (obj) => {
    dispatch({
      type: 'join',
      payload: obj,
    });
    socket.emit('join user', obj);
    const { data } = await axios.get(`/chats/${obj.chatId}`);
    dispatch({ type: 'set data', payload: data });
  };

  window.socket = socket;

  return (
    <div>
      {!state.joined ? (
        <Entrance onJoin={onJoin} />
      ) : (
        <Chat {...state} sendMessage={addMessage} />
      )}
    </div>
  );
}

export default App;

//TODO try,catch
// axios, ??io.to(room).emit('event', data)
// refactor file structure
// my message to right
