export const ACTION_LOGIN = 'ACTION_LOGIN';

export const actionLogin = (email) => ({
  type: ACTION_LOGIN,
  payload: email,
});
