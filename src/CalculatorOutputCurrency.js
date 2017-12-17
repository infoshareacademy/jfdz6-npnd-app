import React, {Component} from 'react'
import {connect} from 'react-redux'

import OutputCurrencyList from './OutputCurrencyList'

class CalculatorOutputCurrency extends Component {

  calculateOutput = () => {
    const calculateOutputToPLN = () => {
      if (this.props.userValue === null) {
        return true;
      }
      return (this.props.userValue * this.props.rates.find(item => item.code === this.props.selectValue).mid)
    }
    let result = parseFloat(calculateOutputToPLN()) / parseFloat(this.props.rates.find(item => item.code === this.props.selectOutputValue).mid)
    return result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi:
          <h2 style={{color: 'rgb(51, 122, 183)'}}>
            {this.calculateOutput()}
          </h2>
        </p>
        <OutputCurrencyList/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  userValue: state.exchangeRates.userValue,
  selectValue: state.exchangeRates.selectValue,
  selectOutputValue: state.exchangeRates.selectOutputValue
})

export default connect(
  mapStateToProps
)(CalculatorOutputCurrency)