import React, {Component} from 'react'
import {connect} from 'react-redux'

class CalculatorOutputCurrency extends Component {

  calculateOutput = () => {
    if (this.props.userValue === null) {
      return true;
    }
    return (this.props.userValue * this.props.rates.find(item => item.code === this.props.selectValue).mid).toFixed(2)
  }

  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi:
          <h2 style={{color: 'rgb(51, 122, 183)'}}>
            {this.calculateOutput()}
          </h2>
        </p>
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