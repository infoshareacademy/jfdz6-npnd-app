import React from 'react'
import { connect } from 'react-redux'
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input } from 'reactstrap'
import moment from 'moment'
import Octicon from 'react-octicon'

import { calculateBudget } from '../../utils'
import { getYesterdayRates } from "../../state/historicalExchangeRates";
import { buyCurrency } from "../../state/handleTransactions"
import { getCurrencies } from "../../state/exchangeRates"

import './Market.css'

class Market extends React.Component {

  state = {
    modal: false,
    selectedCurrency: '',
    selectedRate: null,
    result: null,
    yesterdayDate: (moment().add(-1, 'days').format('dddd') === 'Sunday' ||
      moment().add(-1, 'days').format('dddd') === 'Saturday' ) ?
      (moment().add(-1, 'days').format('dddd') === 'Sunday' ?
        moment().add(-3, 'days').format('YYYY-MM-DD') :
        moment().add(-2, 'days').format('YYYY-MM-DD') ) :
      moment().add(-1, 'days').format('YYYY-MM-DD')
  }

  toggleModal = event => {

    const target = event.currentTarget
    const selectedCurrency = target.dataset.itemId
    const selectedRate = this.props.rates.filter(rate =>
      rate.code === selectedCurrency
    ).map(e => e.mid)

    this.setState({
      selectedCurrency: selectedCurrency,
      modal: !this.state.modal,
      selectedRate: selectedRate
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

  closeModal = () => {
    this.setState({
      modal: false,
      selectedCurrency: '',
      selectedRate: null,
      result: null
    })
  }

  handleBuy = () => {

    const currencyCode = this.state.selectedCurrency
    const currencyAmount = this.state.amount*1
    const dateOfTransaction = (moment().format('YYYY-MM-DD'))
    const transactionRate = (this.props.rates.filter(rate2 => rate2.code === this.state.selectedCurrency)
      .map(e => e.mid)[0])
    const transactionId = Date.now()
    const transactionKey = currencyCode + transactionRate


    this.props.buyCurrency({
      transactionId,
      currencyCode,
      currencyAmount,
      transactionRate,
      dateOfTransaction,
      transactionKey
    })

    this.setState({
      modal: false,
      result: null
    })
  }

  componentWillMount() {
    this.props.getCurrencies()

    const yesterdayDate = this.state.yesterdayDate

    this.props.getYesterdayRates(yesterdayDate)
  }

  render() {
    return (
      <div>
        <h2 className='text-center market-header-text'>
          Rynek
        </h2>

        <Modal isOpen={this.state.modal} toggle={this.closeModal} keyboard={false}>
          <FormGroup>
            <ModalHeader toggle={this.closeModal}>Kup - {this.state.selectedCurrency}</ModalHeader>
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
              <Input type="number" name="number" id="exampleSelect" placeholder="Jak dużo?"
                     onChange={this.handleChange}>
              </Input>
              {(this.state.result !== null && (this.state.result > 0)) ? `Będzie trza zapłacić  ${(Math.round(this.state.result*10000)/10000)} zł` : ''}
            </ModalBody>
            <ModalFooter>
              <Button color="success"
                      onClick={this.handleBuy}
                      disabled={this.state.amount > 0 && calculateBudget(this.props.budget, this.props.transactions)   > this.state.result ? false : true}>
                Kup
              </Button>
              <Button color="secondary" onClick={this.closeModal}>Zamknij</Button>
            </ModalFooter>
          </FormGroup>
        </Modal>

        <Table hover size="sm" responsive className='text-center table-text'>
          <thead>
          <tr>
            <th>Waluta</th>
            <th>Kurs</th>
            <th>Trend?</th>
          </tr>
          </thead>
          <tbody>
          {this.props.rates.map(
            rate => <tr
              key={rate.code}
              onClick={this.toggleModal}
              data-item-id={rate.code}
              className='table-rows'
            >
              <td>
              {
                rate.code
              }
              </td>
              <td>
                {
                  this.props.rates.filter(rate2 => rate2.code === rate.code)
                    .map(e => <span key={e.code}> {e.mid}</span>)
                }
              </td>
              <td>
                {
                  this.props.yesterdayRates.filter(item => item.code === rate.code)
                    .map(
                      w => <span>
                        {
                          (rate.mid - w.mid) > 0 ?
                      <Octicon name="arrow-up" className='arrow-up' mega/> :
                      <Octicon name="arrow-down" className='arrow-down' mega/>
                        }
                      </span>
                    )
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
  yesterdayRates: state.historicalExchangeRates.yesterdayData,
  currencyCode: state.handleTransactions.currencyCode,
  transactions: state.handleTransactions.transactions,
  budget: state.handleTransactions.budget
})

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrencies()),
  getYesterdayRates: (yesterdayDate) => dispatch(getYesterdayRates(yesterdayDate)),
  buyCurrency: (transactionId, currencyCode, currencyAmount, transactionRate, dateOfTransaction, transactionKey) => dispatch(buyCurrency(transactionId, currencyCode, currencyAmount, transactionRate, dateOfTransaction, transactionKey))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps)(Market)