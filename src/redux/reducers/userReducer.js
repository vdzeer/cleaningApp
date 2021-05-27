const initialState = {
  token: '',
  money: 0,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_LOGIN':
      return {
        ...state,
        token: action.payload,
        money: Math.floor(Math.random() * 500),
      };
    case 'ON_REGISTER':
      return {
        ...state,
        token: action.payload,
        money: Math.floor(Math.random() * 500),
      };
    case 'ON_CHANGE_MONEY':
      return {
        ...state,
        money: action.payload,
      };
    default:
      return state;
  }
};

export { UserReducer };
