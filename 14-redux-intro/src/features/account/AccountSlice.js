import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdrawal(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
          meta: undefined,
          error: undefined,
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      if (state.loan === 0) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdrawal, requestLoan, payLoan } = accountSlice.actions;

function deposit(amount, currency) {
  if (currency === 'USD')
    return {
      type: 'account/deposit',
      payload: amount,
    };

  return async (dispatch, getState) => {
    dispatch({ type: 'account/convertingCurrency', isLoading: true });
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({
      type: 'account/deposit',
      payload: converted,
    });
  };
}

export { deposit };
export default accountSlice.reducer;

// function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case 'account/withdrawal':
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: state.loan + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance - action.payload.amount,
//       };
//     case 'account/payLoan':
//       if (state.loan === 0) return state;
//       return {
//         ...state,
//         loanPurpose: '',
//         // loan: state.loan - action.payload,
//         loan: 0,
//         balance: state.balance + action.payload,
//       };
//     case 'account/convertingCurrency':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// function deposit(amount, currency) {
//   if (currency === 'USD')
//     return {
//       type: 'account/deposit',
//       payload: amount,
//     };

//   return async (dispatch, getState) => {
//     dispatch({ type: 'account/convertingCurrency', isLoading: true });
//     const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`);
//     const data = await res.json();
//     const converted = data.rates.USD;

//     dispatch({
//       type: 'account/deposit',
//       payload: converted,
//     });
//   };
// }

// function withdrawal(amount) {
//   return {
//     type: 'account/withdrawal',
//     payload: amount,
//   };
// }

// function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount, purpose },
//   };
// }

// function payLoan(amount) {
//   return {
//     type: 'account/payLoan',
//     payload: amount,
//   };
// }

// export default accountReducer;
// export { deposit, payLoan, requestLoan, withdrawal };
