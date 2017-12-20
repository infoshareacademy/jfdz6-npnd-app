import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import firebase from 'firebase'

import exchangeRates from './state/exchangeRates'
import auth from'./state/auth'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAE4Q-71zVhOkh_3oB3aLlOBjn_oitx_c0",
  authDomain: "react-project-23cb9.firebaseapp.com",
  databaseURL: "https://react-project-23cb9.firebaseio.com",
  projectId: "react-project-23cb9",
  storageBucket: "",
  messagingSenderId: "752624683001"
};
firebase.initializeApp(config);

const reducer = combineReducers({
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

window.store = store
// firebase.auth().createUserWithEmailAndPassword('p.baranski@yahoo.pl', 'password')

export default store;