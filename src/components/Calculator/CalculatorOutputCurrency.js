import React, {Component} from 'react'
import {connect} from 'react-redux'

import './CalculatorOutputCurrency.css'

class CalculatorOutputCurrency extends Component {

  calculateOutput = () => {
    const {userValue, rates, selectInputValue, selectOutputValue} = this.props
    if (userValue === null || rates.length === 0 || selectInputValue === null || selectOutputValue === null) {
      return
    }

    const inPLN = userValue * rates.find(item => item.code === selectInputValue).mid
    const inOther = rates.find(item => item.code === this.props.selectOutputValue).mid

    let result = parseFloat(inPLN) / parseFloat(inOther)

    return result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div>
        <p className='text-center calculator-instruction'>Podana kwota przeliczona z {this.props.selectInputValue ||
        <em><u>(wybierz walutę, z której chcesz przeliczyć)</u></em>} na {this.props.selectOutputValue ||
        <em><u>(wybierz walutę, na którą chcesz przeliczyć)</u></em>} wynosi:</p>
        <p className='text-center calculator-output-message'>
          {this.calculateOutput() ? this.calculateOutput() : 'Proszę wpisać liczbę'}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  userValue: state.exchangeRates.userValue,
  selectInputValue: state.exchangeRates.selectInputValue,
  selectOutputValue: state.exchangeRates.selectOutputValue
})

export default connect(
  mapStateToProps
)(CalculatorOutputCurrency)