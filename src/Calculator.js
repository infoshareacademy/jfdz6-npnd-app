import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getCurrencies} from "./state/exchangeRates"

import CalculatorInputCurrency from './CalculatorInputCurrency'
import CalculatorOutputCurrency from './CalculatorOutputCurrency'
import Example from './DropdownButton'

class Calculator extends Component {

  componentDidMount() {
    this.props.getCurrencies()
  }

  render() {
    return (
      <div>
        <CalculatorInputCurrency/>
        {/*{this.props.rates.map(rate => <li>{rate.currency}  {rate.mid}</li>)}*/}
        <CalculatorOutputCurrency/>
        <Example/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data
})
const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrencies()),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator)