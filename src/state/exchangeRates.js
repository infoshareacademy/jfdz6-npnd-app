const ADD = 'ADD'

const BEGIN = 'GET_BEGIN'
const SUCCESS = 'GET_SUCCESS'
const FAIL = 'GET_FAIL'

export const add = value => ({
  type: ADD,
  userValue: value
})

export const getCurrencies = () => dispatch => {
  dispatch({type: BEGIN})
  fetch(
    'http://api.nbp.pl/api/exchangerates/tables/A?format=json'
  ).then(
    response => response.json()
  ).then(
    data => dispatch({type: SUCCESS, data: data[0].rates})
  ).catch(
    error => dispatch({type: FAIL, error})
  )
}

const initialState = {
  data: [],
  getting: false,
  adding: false,
  removing: false,
  error: null,
  userValue: null,
  selectValue: 'THB',
  // selectRate: function() {
  //   return this.selectValue
  // }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD:
      if (typeof parseInt(action.userValue) !== 'number' || isNaN(action.userValue)) {
        return {
          ...state,
          error: new Error('Proszę wpisać liczbę')
        }
      }
      return {
        ...state,
        userValue: action.userValue
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
    default:
      return state
  }
}