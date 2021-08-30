import './Chat.css';

import React, { useState, useRef, useEffect } from 'react';
import Message from '../Message/Message';
import Users from '../Users/Users';
import socket from '../../utils/socket';

export default function Chat({ users, messages, username, chatId }) {
  const [messageText, setMessageText] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 9999999);
  }, [messages]);
  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('new message', {
      username,
      text: messageText,
      chatId,
    });
    setMessageText('');
  };

  return (
    <div className='chat'>
      <div className='chat__users'>
        <p className='chat__users-counter'>{`Онлайн ${users.length}`}</p>
        {users.map((name, index) => {
          return <Users key={index} name={name} />;
        })}
      </div>
      <div className='chat__container'>
        <h2 className='chat__title'>{`Чат ${chatId}`}</h2>
        <div className='chat_messages' ref={messagesRef}>
          {messages.map((message, index) => {
            const messageStyle =
              message.username === username
                ? { alignSelf: 'flex-end', alignItems: 'flex-end' }
                : { alignSelf: 'flex-start', alignItems: 'flex-start' };
            return (
              <Message key={index} message={message} style={messageStyle} />
            );
          })}
        </div>
        <form className='chat__form' onSubmit={handleSend}>
          <input
            className='chat__input'
            value={messageText}
            onChange={handleChange}
            autoFocus
          />
          <button className='btn chat__btn' onClick={handleSend}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
