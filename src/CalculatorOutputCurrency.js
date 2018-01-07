import React, { Component } from 'react'
import { connect } from 'react-redux'

class CalculatorOutputCurrency extends Component {

  calculateOutput = () => {
    const { userValue, rates, selectValue, selectOutputValue } = this.props
    if (userValue === null || rates.length === 0 || selectValue === null || selectOutputValue === null) {
      return
    }

    const inPLN = userValue * rates.find(item => item.code === selectValue).mid
    const inOther = rates.find(item => item.code === this.props.selectOutputValue).mid

    let result = parseFloat(inPLN) / parseFloat(inOther)

    return result.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div>
        <p>Podana kwota przeliczona z {this.props.selectValue} na {this.props.selectOutputValue} wynosi:
          <h2 style={{color: 'rgb(51, 122, 183)'}}>
            {this.calculateOutput() ? this.calculateOutput() : 'Proszę wpisać liczbę'}
          </h2>
        </p>

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