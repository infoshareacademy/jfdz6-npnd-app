const BUY = 'handleTransaction/BUY'
const SELL = 'handleTransaction/SELL'

export const buyCurrency = (transactionData) => dispatch => {
  dispatch({ type: BUY, transactionData  })
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
        transactions: state.transactions
      }
    }
    default:
      return state
  }
}