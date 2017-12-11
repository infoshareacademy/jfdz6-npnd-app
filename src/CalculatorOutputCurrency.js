import React, { Component } from 'react'
import {connect} from 'react-redux'

class CalculatorOutputCurrency extends Component {

  // calculateOutput = this.props.userValue => {
  //   const findMid = (this.props.selectValue) => {
  //     return this.props.rates.find(item => item.code === this.props.selectValue).mid
  //   }
  //   return this.props.userValue * findMid(this.props.selectValue)
  // }


  render() {
    return (
      <div>
        <p>Podana kwota w PLN wynosi:{this.props.userValue}</p>
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