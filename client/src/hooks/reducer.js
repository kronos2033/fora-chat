export default (state, action) => {
  switch (action.type) {
    case 'join':
      return {
        ...state,
        joined: true,
        chatId: action.payload.chatId,
        username: action.payload.username,
      };
    case 'set users':
      return {
        ...state,
        users: action.payload,
      };
    case 'set messages':
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};
