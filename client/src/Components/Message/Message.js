import './Message.css';

import React from 'react';

export default function Message({ message, owner, time }) {
  const messageStyle = owner
    ? { alignSelf: 'flex-end', alignItems: 'flex-end' }
    : { alignSelf: 'flex-start', alignItems: 'flex-start' };

  const containerStyle = owner
    ? { flexDirection: 'row-reverse' }
    : { flexDirection: 'row' };

  return (
    <div className='message' style={messageStyle}>
      <div className='message__container' style={containerStyle}>
        <p className='message__text'>{message.text}</p>
        <span className='message__time'>{time}</span>
      </div>
      <span className='message__author'>от {message.username}</span>
    </div>
  );
}
