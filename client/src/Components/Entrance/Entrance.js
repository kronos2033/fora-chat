import React, { useState } from 'react';
import { sendEntranceData } from '../../utils/api';
import './Entrance.css';

export default function Entrance() {
  const [chatId, setChatId] = useState('');
  const [username, setUsername] = useState('');
  const validData = !(chatId && username);

  const handleChangeUsername = (e) => setUsername(e.target.value);

  const handleChangeChatId = (e) => setChatId(e.target.value);

  const onSendData = () => {
    sendEntranceData(chatId, username);
  };

  return (
    <div className='wrapper'>
      <div className='entrance'>
        <input
          className='entrance__input'
          placeholder='chat ID'
          value={chatId}
          onChange={handleChangeChatId}
        ></input>
        <input
          className='entrance__input'
          placeholder='Ваше имя'
          value={username}
          onChange={handleChangeUsername}
        ></input>
        <button
          className={`entrance__btn ${
            validData && 'entrance__btn_type_inactive'
          }`}
          disabled={validData}
          onClick={onSendData}
        >
          Войти
        </button>
      </div>
    </div>
  );
}
