import firebase from 'firebase'

const BUY = 'handleTransaction/BUY'
const SELL = 'handleTransaction/SELL'
const SET_TRANSACTIONS = 'handleTransaction/SET_TRANSACTIONS'

let path = null
let listener = null
export const enableTransationSync = () => dispatch => {
  if (path && listener) {
    dispatch(disableTransactionSync())
  }

  const userId = firebase.auth().currentUser.uid
  path = `/wallet/${userId}`
  listener = firebase.database().ref(path).on('value', snapshot => {
    const transactions = Object.entries(snapshot.val() || {}).map(([id, val]) => ({
      id,
      ...val.transactionData
    }))

    dispatch({ type: SET_TRANSACTIONS, transactions })
  })
}

export const disableTransactionSync = () => dispatch => {
  firebase.database().ref(path).off('value', listener)
}

export const writeTransactionData = transactionData => dispatch => {
  const userId = firebase.auth().currentUser.uid
  firebase.database().ref('/wallet/' + userId).push({
    transactionData: transactionData
  })
}

export const buyCurrency = (transactionData) => dispatch => {
  dispatch({ type: BUY, transactionData  })
  dispatch(writeTransactionData(transactionData))
}

export const sellCurrency = (transactionData) => dispatch => {
  dispatch({ type: SELL, transactionData})
  dispatch(writeTransactionData(transactionData))
}


const initialState = {
  budget: 10000,
  transactions: []
}

export default ( state = initialState, action = {}) => {
  switch (action.type) {
    case BUY: {
      return {
        ...state,
         transactions: state.transactions.concat(action.transactionData)
      }
    }
    case SELL: {
      return {
        ...state,
        transactions: state.transactions.concat(action.transactionData)
      }
    }
    case SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: action.transactions
      }
    }
    default:
      return state
  }
}