import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { Table } from 'reactstrap'

/*
Zalogowany użytkownik powinien móc dodać i zarządzać swoim portfelem walut.

Portfel prezentuje zmianę wartości, zysku lub straty

naszego portfela w stosunku do daty zakupu (dodania wpisu do portfela).

Jeśli od momentu zakupu waluta ma najwyższą wartość kursu
użytkownik powinien zobaczyć komunikat o potencjalnej korzyści ze sprzedaży.
 */

class Wallet extends React.Component {



  render() {
    return (
      <div>
        <h1>My Wallet</h1>

        <Table hover size="sm" responsive>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Today rates</th>
            <th>Date of buy</th>
            <th>Price You paid</th>
            <th>Delta</th>
            <th>Recommendation</th>
          </tr>
          </thead>
          <tbody>
          {this.props.transactions.map(
            rate => <tr
            key={rate.transactionId}
            >
              {rate.currencyCode}
              <td>
                {
                  this.props.rates.filter(rate2 => rate2.code === rate.currencyCode)
                    .map(e => <span key={e.transactionId}> {e.mid}</span>)
                }
              </td>
              <td>
                {
                  this.props.transactions.filter(rate2 => rate2.transactionId === rate.transactionId)
                    .map(e => <span key={e.transactionId}> {e.dateOfTransaction}</span>)
                }
              </td>
              <td>
                {
                  this.props.transactions.filter(rate2 => rate2.transactionId === rate.transactionId)
                    .map(e => <span key={e.transactionId}> {e.transactionRate}</span>)
                }
              </td>
            </tr>)}
          </tbody>
        </Table>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  transactions: state.handleTransactions.transactions
})

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrencies())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Wallet)