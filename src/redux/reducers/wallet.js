import {
  ACTION_CURRENCY,
  ACTION_EXPENSES,
  // ACTION_SUM,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // sumResult: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_CURRENCY:
    return { ...state, currencies: action.currency,
    };
  case ACTION_EXPENSES:
    return { ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, exchangeRates: action.data },
      ],
    };
  default:
    return state;
  }
};

export default wallet;
