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
        <p style={{marginBottom: 0}}>Podana kwota przeliczona z {this.props.selectValue || <em><u>(wybierz walutę, z której chcesz przeliczyć)</u></em>} na {this.props.selectOutputValue || <em><u>(wybierz walutę, na którą chcesz przeliczyć)</u></em>} wynosi:</p>
          <p style={{fontSize: 35}}>
            {this.calculateOutput() ? this.calculateOutput() : 'Proszę wpisać liczbę'}
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