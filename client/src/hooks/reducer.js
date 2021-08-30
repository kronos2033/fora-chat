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
    case 'new messages':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'disconnect user':
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
