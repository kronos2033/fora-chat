import './Users.css';

import React from 'react';

export default function Users({ name }) {
  return (
    <div className='users'>
      <p className='users__name'>{name}</p>
    </div>
  );
}
