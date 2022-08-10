import {
  ACTION_CURRENCY,
  ACTION_ID_EDIT,
  ACTION_EDITOR,
  ACTION_ERASE,
  ACTION_EXPENSES,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editing: false,
  idEdit: 0,
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
  case ACTION_ERASE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== Number(action.payload)),
    };
  case ACTION_ID_EDIT:
    return { ...state,
      editing: true,
      idEdit: action.id,
    };
  case ACTION_EDITOR:
    return ({
      ...state,
      expenses: [...action.expenses],
      editing: false,
    });
  default:
    return state;
  }
};

export default wallet;
