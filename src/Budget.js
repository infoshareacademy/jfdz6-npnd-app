import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class Budget extends React.Component {


  render() {
    return (
      <div>
        <h2>Logi transkacji</h2>
        <Table hover size="sm" responsive>
          <thead>
          <tr>
            <th>Waluta</th>
            <th>Kurs transakcji</th>
            <th>Ilość</th>
            <th>Data transakcji</th>
          </tr>
          </thead>
          <tbody>
          {
            (this.props.transactions).map(
              rate => <tr
                key={rate.transactionId}
                data-item-id={rate.currencyCode}
                data-item-amount={rate.currencyAmount}
                data-item-rate={rate.transactionRate}
              >
                {rate.currencyCode}
                <td>
                  {
                    this.props.transactions.filter(rate2 => rate2.transactionId === rate.transactionId)
                      .map(e => <span key={e.transactionId}> {e.transactionRate}</span>)
                  }
                </td>
                <td>
                  {
                    this.props.transactions.filter(rate2 => rate2.transactionId === rate.transactionId)
                      .map(e => <span key={e.transactionId}> {e.currencyAmount}</span>)
                  }
                </td>
                <td>
                  {
                    this.props.transactions.filter(rate2 => rate2.transactionId === rate.transactionId)
                      .map(e => <span key={e.transactionId}> {e.dateOfTransaction}</span>)
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
  transactions: state.handleTransactions.transactions,
  auth: state.auth
})


export default connect(
  mapStateToProps,
)(Budget)