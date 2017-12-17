import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button } from 'reactstrap'
import CurrencyList from './CurrencyList'

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
          <input type='text' ref={item => this.userInput = item} placeholder={this.props.error ? this.props.error.message : this.props.userValue}/>
          <Button type="submit" bsSize="sm" style={{marginLeft: 10}}>Przelicz</Button>
        </form>
        <CurrencyList/>
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