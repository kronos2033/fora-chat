/* eslint-disable no-unused-vars */
import './App.css';
import React, { useReducer } from 'react';
import Entrance from '../Entrance/Entrance';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <div className=''>
      <Entrance />
    </div>
  );
}

export default App;
