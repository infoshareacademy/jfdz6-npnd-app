import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import firebase from 'firebase'

import exchangeRates from './state/exchangeRates'
import auth, { enableSync } from'./state/auth'
import historicalExchangeRates from "./state/historicalExchangeRates";
import handleTransactions from "./state/handleTransactions";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCSlAGLf4tYSWIWP9Z55qDxHuqLPyx2jf8",
  authDomain: "react-firebase-71a87.firebaseapp.com",
  databaseURL: "https://react-firebase-71a87.firebaseio.com",
  projectId: "react-firebase-71a87",
  storageBucket: "react-firebase-71a87.appspot.com",
  messagingSenderId: "167313999153"
};
firebase.initializeApp(config);


const reducer = combineReducers({
  historicalExchangeRates: historicalExchangeRates,
  handleTransactions: handleTransactions,
  exchangeRates,
  auth
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    persistState(['auth']/* config*/),
)

const store = createStore(
    reducer,
    enhancer
)

store.dispatch({type: 'RESET'})

window.store = store
store.dispatch(enableSync())

export default store;