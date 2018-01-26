export function getTransactions (transactions) {
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

export function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function calculateBudget(budget, transactions) {
  let currencies =  getTransactions(transactions).map(e => e.currencyAmount * e.transactionRate)
    let result = currencies.reduce( (curr, prev) => curr - prev, budget)
  return Math.round(result);
}