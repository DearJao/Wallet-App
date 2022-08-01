import { ACTION_LOGIN, ACTION_CURRENCY } from './actionsTypes';

export const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  payload: email,
});

export const actionCurrency = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currency = Object.keys(data).filter((coin) => coin !== 'USDT');
  dispatch({
    type: ACTION_CURRENCY,
    currency,
  });
};
