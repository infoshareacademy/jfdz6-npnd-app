import React, { Component } from 'react'
import {connect} from 'react-redux'

import CalculatorInputCurrency from './CalculatorInputCurrency'

class CalculatorOutputCurrency extends Component {

  calculateOutput = value => {
    return value * this.props.rates.mid
  }

  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi:{this.calculateOutput(this.props.userValue)}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  userValue: state.exchangeRates.userValue
})

export default connect(
  mapStateToProps
)(CalculatorOutputCurrency)