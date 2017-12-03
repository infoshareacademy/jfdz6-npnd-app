import React, { Component } from 'react'
import {connect} from 'react-redux'

import CalculatorInputCurrency from './CalculatorInputCurrency'
import CalculatorOutputCurrency from './CalculatorOutputCurrency'

class Calculator extends Component {
  state={

  }


  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A?format=json')
      .then(
        response => response.json()
      ).then(data => console.log(data[0].rates))
  }
  render() {
    return (
      <div>
      <CalculatorInputCurrency />
      <CalculatorOutputCurrency />
      </div>
    )
  }
}

export default Calculator