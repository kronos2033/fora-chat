import './Message.css';

import React from 'react';

export default function Message({ message }) {
  return (
    <div className='message'>
      <p className='message__text'>{message.text}</p>
      <div>
        <span className='message__author'>{message.username}</span>
      </div>
    </div>
  );
}
