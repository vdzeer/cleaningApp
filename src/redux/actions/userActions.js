import axios from 'axios';

export const onLogin = (email, password) => {
  return async dispatch => {
    try {
      const response = axios.post(`${2}/login`, {
        email,
        password,
      });

      if (!response) {
        dispatch({
          type: 'ON_ERROR',
          payload: 'Login issue!',
        });
      } else {
        dispatch({
          type: 'ON_LOGIN',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_ERROR',
        payload: error,
      });
    }
  };
};

export const onRegister = (email, password) => {
  return async dispatch => {
    try {
      const response = axios.post(`${2}/register`, {
        email,
        password,
      });

      if (!response) {
        dispatch({
          type: 'ON_ERROR',
          payload: 'Registration issue!',
        });
      } else {
        dispatch({
          type: 'ON_REGISTER',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_ERROR',
        payload: error,
      });
    }
  };
};

export const onChangeMoney = money => {
  return async dispatch =>
    dispatch({
      type: 'ON_CHANGE_MONEY',
      payload: money,
    });
};
