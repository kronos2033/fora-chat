import './Chat.css';

import React, { useState, useRef, useEffect } from 'react';
import Message from '../Message/Message';
import Users from '../Users/Users';
import socket from '../../utils/socket';
import axios from 'axios';
export default function Chat({
  joined,
  users,
  messages,
  username,
  chatId,
  onLink,
}) {
  const [messageText, setMessageText] = useState('');
  const messagesRef = useRef(null);
  const date = new Date();
  const currentTime = `${date.getHours()} : ${
    String(date.getMinutes()).length == 1
      ? '0' + date.getMinutes()
      : date.getMinutes()
  }`;
  useEffect(() => {
    messagesRef.current.scrollTo(0, 9999999);
  }, [messages]);
  console.log('users', users.length);
  useEffect(async () => {
    if (!joined) {
      const chatId = parseInt(location.pathname.match(/\d+/));
      await axios.post(`/chats/${chatId}`);
      onLink({ chatId, username: `Гость ${String(socket.id).slice(-2)}` });
    }
  }, []);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('new message', {
      username,
      text: messageText,
      chatId,
      time: currentTime,
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
        <h2 className='chat__title'>
          {`Чат ${chatId}`}
          <button className='chat__copy' onClick={handleCopyLink} />
        </h2>
        <div className='chat_messages' ref={messagesRef}>
          {messages.map((message, index) => {
            const messageOwner = message.username === username;
            return (
              <Message
                key={index}
                message={message}
                owner={messageOwner}
                time={message.time}
              />
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
