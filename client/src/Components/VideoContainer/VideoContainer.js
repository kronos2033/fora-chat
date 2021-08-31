import './VideoContainer.css';

import React from 'react';

export default function VideoContainer() {
  return (
    <div className='video-container'>
      <video autoPlay id='video' className='video-container__video' />
    </div>
  );
}
