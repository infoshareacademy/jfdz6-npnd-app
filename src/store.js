import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'

import exchangeRates from './state/exchangeRates'

const reducer = combineReducers({
  exchangeRates: exchangeRates
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

export default store;