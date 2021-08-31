import React from 'react';
import './Users.css';

export default function Users({ name }) {
  return (
    <div className='users'>
      <p className='users__name'>{name}</p>
    </div>
  );
}
