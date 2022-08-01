import { ACTION_CURRENCY } from '../actions/actionsTypes';

const INITIAL_STATE = { currencies: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_CURRENCY:
    return { ...state, currencies: action.currency };
  default:
    return state;
  }
};

export default wallet;
