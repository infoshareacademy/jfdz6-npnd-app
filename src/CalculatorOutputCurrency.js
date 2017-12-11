import React, {Component} from 'react'
import {connect} from 'react-redux'

class CalculatorOutputCurrency extends Component {

  calculateOutput = () => {
    return this.props.userValue * this.props.rates.find(item => item.code === this.props.selectValue).mid
  }

  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi:{this.calculateOutput()}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  userValue: state.exchangeRates.userValue,
  selectValue: state.exchangeRates.selectValue
})

export default connect(
  mapStateToProps
)(CalculatorOutputCurrency)