import firebase from 'firebase'

const BUY = 'handleTransaction/BUY'
const SELL = 'handleTransaction/SELL'

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
    default:
      return state
  }
}