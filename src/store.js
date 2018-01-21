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
  apiKey: "AIzaSyAE4Q-71zVhOkh_3oB3aLlOBjn_oitx_c0",
  authDomain: "react-project-23cb9.firebaseapp.com",
  databaseURL: "https://react-project-23cb9.firebaseio.com",
  projectId: "react-project-23cb9",
  storageBucket: "react-project-23cb9.appspot.com",
  messagingSenderId: "752624683001"
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
    persistState([]/* config*/),
)

const store = createStore(
    reducer,
    enhancer
)

store.dispatch({type: 'RESET'})

window.store = store
store.dispatch(enableSync())

export default store;