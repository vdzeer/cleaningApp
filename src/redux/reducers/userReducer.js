const initialState = {
  user: { id: 123 },
  money: 213,
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_LOGIN':
      return {
        ...state,
        user: action.payload,
        money: Math.floor(Math.random() * 500),
      };
    case 'ON_REGISTER':
      return {
        ...state,
        user: action.payload,
        money: Math.floor(Math.random() * 500),
      };
    case 'ON_CHANGE_MONEY':
      return {
        ...state,
        money: action.payload,
      };
    case 'ON_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { UserReducer };
