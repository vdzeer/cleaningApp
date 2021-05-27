import { BASE_URL } from '../../utils/AppConst';
import post from '../../utils/Fetch';

export const onLogin = (email, password) => {
  return async dispatch => {
    try {
      const data = await post(`${BASE_URL}/auth/login`, 'POST', {
        email: email,
        password: password,
      });

      if (data)
        dispatch({
          type: 'ON_LOGIN',
          payload: data,
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onRegister = (email, username, password) => {
  return async dispatch => {
    try {
      const data = await post(`${BASE_URL}/auth/reg`, 'POST', {
        email: email,
        username: username,
        password: password,
      });

      if (data)
        dispatch({
          type: 'ON_REGISTER',
          payload: data,
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onChangeMoney = money => {
  return dispatch =>
    dispatch({
      type: 'ON_CHANGE_MONEY',
      payload: money,
    });
};
