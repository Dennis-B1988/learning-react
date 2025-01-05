import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  customer: {
    name: '',
    nationalId: '',
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'account/withdrawal':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: state.loan + action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance - action.payload.amount,
      };
    case 'account/payLoan':
      if (state.loan === 0) return state;
      return {
        ...state,
        loanPurpose: '',
        loan: state.loan - action.payload,
        balance: state.balance + action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

function deposit(amount) {
  return {
    type: 'account/deposit',
    payload: amount,
  };
}

function withdrawal(amount) {
  return {
    type: 'account/withdrawal',
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}

function payLoan(amount) {
  return {
    type: 'account/payLoan',
    payload: amount,
  };
}

store.dispatch(deposit(1000));
store.dispatch(withdrawal(500));
store.dispatch(requestLoan(1000, 'Buying a car'));

console.log(store.getState());

store.dispatch(payLoan(500));

console.log(store.getState());
