const initialState = {
  user: { id: 123 },
  error: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'ON_REGISTER':
      return {
        ...state,
        user: action.payload,
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
