import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button } from 'reactstrap'

import {add, changeCurrency} from './state/exchangeRates'

class CalculatorInputCurrency extends Component {

  handleSubmit = event => {
    event.preventDefault()

    const userInput = this.userInput.value
    this.props.addValue(userInput)
    this.userInput.value = ''
  }

  handleSelectChange = event => {
    const optionField = event.target.value
    this.props.selectCurrency(optionField)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            this.props.error && <p>{this.props.error.message}</p>
          }
          <input type='text' ref={item => this.userInput = item} placeholder={this.props.userValue}/>
          <Button type="submit" bsSize="sm">Przelicz</Button>
        </form>
        <select
          onChange={this.handleSelectChange}
          value={this.props.selectValue}
        >
          {
            this.props.rates.map(
              rate => <option value={rate.code}>{rate.currency}</option>
            )
          }
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  error: state.exchangeRates.error,
  userValue: state.exchangeRates.userValue
})

const mapDispatchToProps = dispatch => ({
  addValue: (userValue) => dispatch(add(userValue)),
  selectCurrency: (selectValue) => dispatch(changeCurrency(selectValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorInputCurrency)