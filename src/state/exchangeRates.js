import {LOG_OUT} from './auth'

const ADD = 'ADD'

const BEGIN = 'GET_BEGIN'
const SUCCESS = 'GET_SUCCESS'
const FAIL = 'GET_FAIL'

const CHANGE_INPUT_CURRENCY = 'CHANGE_INPUT_CURRENCY'
const CHANGE_OUTPUT_CURRENCY = 'CHANGE_OUTPUT_CURRENCY'

export const add = value => ({
  type: ADD,
  userValue: value
})

export const changeInputCurrency = currency => ({
  type: CHANGE_INPUT_CURRENCY,
  selectInputValue: currency
})

export const changeOutputCurrency = currency => ({
  type: CHANGE_OUTPUT_CURRENCY,
  selectOutputValue: currency
})

export const getCurrencies = () => dispatch => {
  dispatch({type: BEGIN})
  fetch(
    'http://api.nbp.pl/api/exchangerates/tables/A?format=json'
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: SUCCESS, data: initialState.data.concat(data[0].rates)})
  ).catch(
    error => dispatch({type: FAIL, error})
  )
}

const initialState = {
  data: [{currency: "polski złoty", code: "PLN", mid: 1}],
  getting: false,
  adding: false,
  removing: false,
  error: null,
  userValue: null,
  selectInputValue: null,
  selectOutputValue: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD:
      if (typeof parseInt(action.userValue) !== 'number' || isNaN(action.userValue) || action.userValue.trim().length === 0) {
        return {
          ...state,
          userValue: null,
          error: new Error('Proszę wpisać liczbę')
        }
      }
      return {
        ...state,
        userValue: action.userValue,
        error: null
      }
    case BEGIN:
      return {
        ...state,
        getting: true,
        error: null
      }
    case SUCCESS:
      return {
        ...state,
        data: action.data,
        getting: false
      }
    case FAIL:
      return {
        ...state,
        getting: false,
        error: action.error
      }
    case CHANGE_INPUT_CURRENCY:
      return {
        ...state,
        selectInputValue: action.selectInputValue
      }
    case CHANGE_OUTPUT_CURRENCY:
      return {
        ...state,
        selectOutputValue: action.selectOutputValue
      }
    case LOG_OUT:
      return initialState
    default:
      return state
  }
}