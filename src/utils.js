export default function getTransactions (transactions) {
  return transactions.reduce((result, next) => {
    result.filter(e => e.transactionKey === next.transactionKey).length > 0 ?
      result[result.findIndex(item => item.transactionKey === next.transactionKey )].currencyAmount = result[result.findIndex(item => item.transactionKey === next.transactionKey)].currencyAmount + next.currencyAmount
      :
      result.push({
        currencyCode: next.currencyCode,
        currencyAmount: next.currencyAmount,
        transactionRate: next.transactionRate,
        transactionKey: next.transactionKey
      })
    return result
  }, [])
}