import './Chat.css';

import React, { useState } from 'react';
import Message from '../Message/Message';
import Users from '../Users/Users';

export default function Chat({ users, messages }) {
  const [message, setMessage] = useState('  ');

  const handleChange = (e) => setMessage(e.target.values);

  const handleSend = () => {};
  return (
    <div className='chat'>
      <div className='chat__users'>
        <p className='chat__users-counter'>{`Онлайн ${users.length}`}</p>
        {users.map((name, index) => {
          return <Users key={index} name={name} />;
        })}
      </div>
      <div className='chat__messages'>
        {messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
        <form className='chat__form'>
          <input
            className='chat__input'
            onChange={handleChange}
            value={message}
          />
          <button className='btn chat__btn' onClick={handleSend}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
