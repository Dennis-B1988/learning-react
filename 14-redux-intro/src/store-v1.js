import { composeWithDevTools } from '@redux-devtools/extension/';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import accountReducer from './features/account/AccountSlice';
import customerReducer from './features/customer/CustomerSlice';

const rooReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rooReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
