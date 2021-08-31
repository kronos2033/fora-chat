import './VideoContainer.css';

import React from 'react';

export default function VideoContainer({ name }) {
  return (
    <div className='video-container'>
      <h2 className='video-container__name'>{name}</h2>
      <video autoPlay id='video' className='video-container__video' />
    </div>
  );
}
