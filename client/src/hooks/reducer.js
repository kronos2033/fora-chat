export default (state, action) => {
  switch (action.type) {
    case 'join':
      return {
        ...state,
        joined: true,
        chatId: action.payload.chatId,
        username: action.payload.username,
      };
    case 'set data':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };
    case 'set users':
      return {
        ...state,
        users: action.payload,
      };
    case 'new messages':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};
