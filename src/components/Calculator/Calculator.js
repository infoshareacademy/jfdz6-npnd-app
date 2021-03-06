import React, {Component} from 'react'
import {connect} from 'react-redux'

import CalculatorInputCurrency from './CalculatorInputCurrency'
import CalculatorOutputCurrency from './CalculatorOutputCurrency'
import {getCurrencies} from "../../state/exchangeRates"

class Calculator extends Component {

  componentDidMount() {
    this.props.getCurrencies()
  }

  render() {
    return (
      <div>
        <CalculatorInputCurrency/>
        <CalculatorOutputCurrency/>
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