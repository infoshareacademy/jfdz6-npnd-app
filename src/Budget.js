import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'
import { Doughnut } from 'react-chartjs-2'
import { getTransactions, getRandomColor  } from './utils'

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

class Budget extends React.Component {


  render() {

    const colors = (getTransactions(this.props.transactions).map(e => getRandomColor().toString()))

    const chartData = {
      ...data,
      labels: getTransactions(this.props.transactions).map(e => e.currencyCode),
      datasets: [ {
        ...data.datasets[ 0 ],
        data: getTransactions(this.props.transactions).map(e => e.currencyAmount),
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }
      ]
    }

    return (
      <div>

        <h2>Doughnut Example</h2>
        <Doughnut data={chartData} />

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