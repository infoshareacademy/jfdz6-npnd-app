const BEGIN = 'historicalExchangeRates/GET_BEGIN'
const SUCCESS = 'historicalExchangeRates/GET_SUCCESS'
const FAIL = 'historicalExchangeRates/GET_FAIL'

export const getHistoricalCurrencies = (currencyStartDate, currencyEndDate) => dispatch => {
  dispatch({ type: BEGIN })
  fetch(
    `https://api.nbp.pl/api/exchangerates/tables/A/${currencyStartDate}/${currencyEndDate}?format=json`
  ).then(
    response => response.json()
  ).then(
    data => dispatch({ type: SUCCESS, historicalData: data[0].rates })
  ).catch(
    error => dispatch({ type: FAIL, error })
  )
}

const initialState = {
  historicalData: [],
  getting: false,
  adding: false,
  removing: false,
  error: null
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case BEGIN:
      return {
        ...state,
        getting: true,
        error: null
      }
    case SUCCESS:
      return {
        ...state,
        data: action.historicalData,
        getting: false
      }
    case FAIL:
      return {
        ...state,
        getting: false,
        error: action.error
      }
    default:
      return state
  }
}