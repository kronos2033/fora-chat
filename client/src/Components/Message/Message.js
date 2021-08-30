import './Message.css';

import React from 'react';

export default function Message({ message, style }) {
  return (
    <div className='message' style={style}>
      <p className='message__text'>{message.text}</p>
      <div>
        <span className='message__author'>{message.username}</span>
      </div>
    </div>
  );
}
