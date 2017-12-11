import React, { Component } from 'react'
import {connect} from 'react-redux'

import CalculatorInputCurrency from './CalculatorInputCurrency'

class CalculatorOutputCurrency extends Component {
  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi:{this.props.userValue}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userValue: state.exchangeRates.userValue
})

export default connect(
  mapStateToProps
)(CalculatorOutputCurrency)