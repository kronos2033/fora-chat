import axios from 'axios';

export const sendEntranceData = (chatId, name) => {
  axios.post('/rooms', { chatId, name });
};
