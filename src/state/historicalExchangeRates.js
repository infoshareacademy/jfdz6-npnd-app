const BEGIN = 'historicalExchangeRates/GET_BEGIN'
const SUCCESS = 'historicalExchangeRates/GET_SUCCESS'
const FAIL = 'historicalExchangeRates/GET_FAIL'
const RESET = 'historicalExchangeRates/GET_RESET'
const BEGIN_YESTERDAY = 'historicalExchangeRates/GET_YESTERDAY'
const SUCCESS_YESTERDAY = 'historicalExchangeRates/GET_YESTERDAY_SUCCESS'
const FAIL_YESTERDAY = 'historicalExchangeRates/GET_YESTERDAY_FAIL'

export const getHistoricalCurrencies = (currencyStartDate, currencyEndDate, currencyId) => dispatch => {
  dispatch({type: BEGIN})
  fetch(
    `https://api.nbp.pl/api/exchangerates/rates/A/${currencyId}/${currencyStartDate}/${currencyEndDate}?format=json`
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: SUCCESS, historicalData: data.rates})
  ).catch(
    error => dispatch({type: FAIL, error})
  )
}

export const resetHistoricalCurrencies = () => dispatch => {
  dispatch({type: RESET, historicalData: [] })

}

export const getYesterdayRates = (yesterdayDate) => dispatch => {
  dispatch({type: BEGIN_YESTERDAY})
  fetch(
    `https://api.nbp.pl/api/exchangerates/tables/A/${yesterdayDate}?format=json`
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: SUCCESS_YESTERDAY, yesterdayData: data[0].rates })
  ).catch(
    error => dispatch({type: FAIL, error})
  )
}

const initialState = {
  historicalData: [],
  getting: false,
  error: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BEGIN:
      return {
        ...state,
        getting: true,
        error: null
      }
    case SUCCESS:
      return {
        ...state,
        data: [],
        historicalData: action.historicalData,
        getting: false
      }
    case FAIL:
      return {
        ...state,
        data: [],
        getting: false,
        error: action.error
      }
    case RESET:
      return {
        ...state,
        data: [],
        getting: false,
        historicalData: [],
      }
    case BEGIN_YESTERDAY:
      return {
        ...state,
        getting:true,
    }
    case SUCCESS_YESTERDAY:
      return {
        ...state,
        yesterdayData: action.yesterdayData,
        getting:false,
        error:null
      }
    case FAIL_YESTERDAY:
      return {
        ...state,
        yesterdayData: [],
        getting: false,
        error: action.error
    }
    default:
      return state
  }
}