const BUY = 'handleTransaction/BUY'

export const buyCurrency = (transactionId,currencyCode,currencyAmount,transactionRate,dateOfTransaction) => dispatch => {
  dispatch({ type: BUY, transactionData: currencyCode  })
}

const initialState = {
  budget: 10000
}


export default ( state = initialState, action = {}) => {
  switch (action.type) {
    case BUY: {
      const { type, ...transaction } = action
      return {
        ...state,
         transaction
      }
    }

    default:
      return state
  }
}