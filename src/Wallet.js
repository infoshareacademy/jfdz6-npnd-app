import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input } from 'reactstrap'
import { sellCurrency } from "./state/handleTransactions"
import moment from 'moment'
import getTransactions from './utils'


/*
Zalogowany użytkownik powinien móc dodać i zarządzać swoim portfelem walut.

Portfel prezentuje zmianę wartości, zysku lub straty

naszego portfela w stosunku do daty zakupu (dodania wpisu do portfela).

Jeśli od momentu zakupu waluta ma najwyższą wartość kursu
użytkownik powinien zobaczyć komunikat o potencjalnej korzyści ze sprzedaży.
 */

class Wallet extends React.Component {

  state = {
    modal: false
  }

  closeModal = () => {
    this.setState({
      modal: false
    })
  }

  toggleModal = event => {

    const target = event.currentTarget
    const selectedCurrency = target.dataset.itemId
    const selectedRate = target.dataset.itemRate
    const myCurrency = target.dataset.itemAmount
    const transactionKey = selectedCurrency + selectedRate

    this.setState({
      selectedCurrency: selectedCurrency,
      modal: !this.state.modal,
      selectedRate: selectedRate,
      curr: myCurrency,
      transactionKey: transactionKey
    });
  }

  handleChange = event => {

    const currencyQuantity = event.target.value
    const result = currencyQuantity * this.state.selectedRate

    this.setState({
      result: result,
      amount: currencyQuantity
    })
  }

  handleSell = () => {

    const transactionId = Date.now()
    const currencyCode = this.state.selectedCurrency
    const currencyAmount = (-1) * this.state.amount
    const transactionRate = this.state.selectedRate * 1
    const dateOfTransaction = (moment().format('YYYY-MM-DD'))
    const transactionKey = this.state.transactionKey

    this.props.sellCurrency({
      transactionId,
      currencyCode,
      currencyAmount,
      transactionRate,
      dateOfTransaction,
      transactionKey
    })

    this.setState({
      modal: false,
      result: null,
    })
  }

  render() {
    return (
      <div>
        <h1>My Wallet</h1>

        <Modal isOpen={this.state.modal} toggle={this.closeModal} keyboard={false}>
          <FormGroup>
            <ModalHeader toggle={this.closeModal}>Sell - {this.state.selectedCurrency}</ModalHeader>
            <ModalBody>
              {
                this.state.selectedCurrency
              } - {
              this.props.rates.filter(
                rate =>
                  rate.code === this.state.selectedCurrency
              ).map(
                e =>
                  <span> {e.currency} - {e.mid}</span>)
            }
              <Input type="number" name="number" id="exampleSelect" placeholder="How much?"
                     onChange={this.handleChange}>
              </Input>
              {(this.state.result !== null && (this.state.result > 0)) ? `Będzie trza zapłacić  ${(Math.round(this.state.result * 10000) / 10000)} zł` : 'nie uda się'}
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.handleSell}
                      disabled={((this.state.amount * 1) > 0 && (this.state.amount * 1) <= (this.state.curr * 1)) ? false : true}>Sell</Button>
              <Button color="secondary" onClick={this.closeModal}>Close</Button>
            </ModalFooter>
          </FormGroup>
        </Modal>

        <Table hover size="sm" responsive>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Today rates</th>
            <th>Rate of purchase</th>
            <th>Amount</th>
            <th>Delta</th>
            <th>Recommendation</th>
          </tr>
          </thead>
          <tbody>
          {
            getTransactions(this.props.transactions).sort(
            (a, b) => a.currencyCode > b.currencyCode
          ).map(
            rate => <tr
              key={rate.transactionId}
              onClick={this.toggleModal}
              data-item-id={rate.currencyCode}
              data-item-amount={rate.currencyAmount}
              data-item-rate={rate.transactionRate}
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
                  getTransactions(this.props.transactions).filter(rate2 => rate2.transactionKey === rate.transactionKey)
                    .map(e => <span key={e.transactionId}> {e.transactionRate}</span>)
                }
              </td>
              <td>
                {
                  getTransactions(this.props.transactions).filter(rate2 => rate2.transactionKey === rate.transactionKey)
                    .map(e => <span key={e.transactionId}> {e.currencyAmount}</span>)
                }
              </td>
              <td>
                {
                  this.props.rates.filter(rate2 => rate2.code === rate.currencyCode)
                    .map(e => <span
                      key={e.transactionId}> {Math.round(((e.mid - rate.transactionRate) * rate.currencyAmount) * 10000) / 10000} </span>)
                }
              </td>
              <td>
                {
                  this.props.rates.filter(rate2 => rate2.code === rate.currencyCode)
                    .map(e => <span
                      key={e.transactionId}> {(e.mid - rate.transactionRate) > 0 ? 'Zarabiasz!' : 'Tracisz!'} </span>)
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
  getCurrencies: () => dispatch(getCurrencies()),
  sellCurrency: (transactionId, currencyCode, currencyAmount, transactionRate, dateOfTransaction, transactionKey) => dispatch(sellCurrency(transactionId, currencyCode, currencyAmount, transactionRate, dateOfTransaction, transactionKey))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Wallet)