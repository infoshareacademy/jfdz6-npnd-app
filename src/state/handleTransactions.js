const BUY = 'handleTransaction/BUY'

export const buyCurrency = (transactionData) => dispatch => {
  dispatch({ type: BUY, transactionData  })
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

    default:
      return state
  }
}