import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Button } from 'reactstrap'
import CurrencyList from './CurrencyList'

import {add} from './state/exchangeRates'

class CalculatorInputCurrency extends Component {

  handleSubmit = event => {
    event.preventDefault()

    const userInput = this.userInput.value
    this.props.addValue(userInput)
    this.userInput.value = ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' ref={item => this.userInput = item} placeholder={this.props.error ? this.props.error.message : this.props.userValue}/>
          <CurrencyList/>
          &#8596;
          <Button type="submit" bsSize="sm" style={{marginLeft: 10}}>Przelicz</Button>
        </form>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorInputCurrency)