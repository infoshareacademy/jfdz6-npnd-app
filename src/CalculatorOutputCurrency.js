import React, { Component } from 'react'

import CalculatorInputCurrency from './CalculatorInputCurrency'

class CalculatorOutputCurrency extends Component {
  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi: {}</p>
      </div>
    )
  }
}

export default CalculatorOutputCurrency