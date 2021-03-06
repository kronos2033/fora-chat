import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Entrance.css';

export default function autofocusEntrance({ onJoin }) {
  const [chatId, setChatId] = useState('');
  const [username, setUsername] = useState('');
  const validData = !(chatId && username);
  const obj = { chatId, username };
  const history = useHistory();

  const handleChangeUsername = (e) => setUsername(e.target.value);

  const handleChangeChatId = (e) => setChatId(e.target.value);

  const onSendData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/chats/${chatId}`);
      onJoin(obj);
      history.push(`/chats/${chatId}`);
    } catch (e) {
      console.log(`Произошла ошибка, ${e}`);
    }
  };

  return (
    <div className='wrapper'>
      <div className='entrance'>
        <form className='entrance__form' onSubmit={onSendData}>
          <input
            className='entrance__input'
            placeholder='chat ID'
            value={chatId}
            onChange={handleChangeChatId}
          />
          <input
            className='entrance__input'
            placeholder='Ваше имя'
            value={username}
            onChange={handleChangeUsername}
          />
          <button
            className={`btn entrance__btn ${
              validData && 'entrance__btn_type_inactive'
            }`}
            disabled={validData}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
