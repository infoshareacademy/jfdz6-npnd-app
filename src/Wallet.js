import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input } from 'reactstrap'
import { sellCurrency } from "./state/handleTransactions"
import moment from 'moment'
import { getTransactions } from './utils'


class Wallet extends React.Component {

  state = {
    modal: false,
    result: null
  }

  closeModal = () => {
    this.setState({
      modal: false,
      amount: null,
      result: null
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

  setMax = () => {

    const currencyQuantity = this.state.curr
    const result = currencyQuantity * this.state.selectedRate

    this.setState({
      result: result,
      amount: currencyQuantity
    })
  }

  componentDidMount() {
    this.props.getCurrencies()
  }

  handleSell = () => {

    const transactionId = Date.now()
    const currencyCode = this.state.selectedCurrency
    const currencyAmount = this.state.amount*(-1)
    const transactionRate = this.state.selectedRate * 1
    const dateOfTransaction = (moment().format('YYYY-MM-DD'))
    const transactionKey = this.state.transactionKey

    console.log(currencyAmount)

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
      amount: null,
      result: null
    })

  }

  render() {
    return (
      <div>
        <h2>
          Mój portfel
        </h2>


        <Modal isOpen={this.state.modal} toggle={this.closeModal} keyboard={false}>
          <FormGroup>
            <ModalHeader toggle={this.closeModal}>Sprzedaj - {this.state.selectedCurrency}</ModalHeader>
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
              <Input type="number"
                     name="number"
                     id="exampleSelect"
                     placeholder="Jak dużo?"
                     value = {this.state.amount}
                     onChange={this.handleChange}
              >
              </Input>
              {(this.state.result !== null && (this.state.result > 0)) ? `Będzie trza zapłacić  ${(Math.round(this.state.result * 10000) / 10000)} zł` : ''}
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.setMax} > MAX </Button>
              <Button color="success" onClick={this.handleSell}
                      disabled={((this.state.amount * 1) > 0 && (this.state.amount * 1) <= (this.state.curr * 1)) ? false : true}>Sprzedaj</Button>
              <Button color="secondary" onClick={this.closeModal}>Zamknij</Button>
            </ModalFooter>
          </FormGroup>
        </Modal>

        <Table hover size="sm" responsive>
          <thead>
          <tr>
            <th>Waluta</th>
            <th>Obecny kurs</th>
            <th>Kurs kupna</th>
            <th>Ilość</th>
            <th>Różnica</th>
            <th>Rekomendacja</th>
          </tr>
          </thead>
          <tbody>
          {
            getTransactions(this.props.transactions).sort(
            (a, b) => a.currencyCode > b.currencyCode
          ).filter(
            ele => ele.currencyAmount > 0
            ).map(
            rate => <tr
              key={rate.transactionId}
              onClick={this.toggleModal}
              data-item-id={rate.currencyCode}
              data-item-amount={rate.currencyAmount}
              data-item-rate={rate.transactionRate}
              style = {{cursor: 'pointer'}}
            >
              <td>
                  {
                    rate.currencyCode
                  }
              </td>
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
                      key={e.transactionId}> {`${Math.round(((e.mid - rate.transactionRate) * rate.currencyAmount) * 10000) / 10000} zł`} </span>)
                }
              </td>
              <td>
                {
                  this.props.rates.filter(rate2 => rate2.code === rate.currencyCode)
                    .map(
                      e => <span
                      key={e.transactionId}
                      >
                        {
                          (e.mid - rate.transactionRate) === 0 ?
                            'Po tyle kupiłeś!' :
                            (e.mid - rate.transactionRate) > 0 ?
                              'Zarabiasz!' :
                              'Tracisz!'
                        }
                        </span>)
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

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrencies()),
  sellCurrency: (transactionId, currencyCode, currencyAmount, transactionRate, dateOfTransaction, transactionKey) => dispatch(sellCurrency(transactionId, currencyCode, currencyAmount, transactionRate, dateOfTransaction, transactionKey))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Wallet)