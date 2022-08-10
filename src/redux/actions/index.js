import {
  ACTION_LOGIN,
  ACTION_CURRENCY,
  ACTION_EXPENSES,
  ACTION_ERASE,
  ACTION_ID_EDIT,
  ACTION_EDITOR,
} from './actionsTypes';

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

export const actionExpenses = (payload) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch({ type: ACTION_EXPENSES, payload, data });
};

export const actionErase = (id) => ({
  type: ACTION_ERASE,
  payload: id,
});

export const actionGetEditId = (id) => ({
  type: ACTION_ID_EDIT,
  id,
});

export const actionEditor = (expenses) => ({
  type: ACTION_EDITOR,
  expenses,
});
