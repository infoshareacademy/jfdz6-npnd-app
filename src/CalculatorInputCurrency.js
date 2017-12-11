import React, {Component} from 'react'
import {connect} from 'react-redux'

import {add, changeCurrency} from './state/exchangeRates'

class CalculatorInputCurrency extends Component {
  // state = {
  //   selectValue: 'THB'
  // }

  handleChange = event => {
    const formField = event.currentTarget
    const userValue = formField.value
    this.props.addValue(userValue)
  }

  handleSelectChange = event => {
    const optionField = event.target.value
    this.props.selectCurrency(optionField)
  }

  render() {
    return (
      <div>
        <form>
          <input
            type='text'
            value={this.props.userValue}
            onChange={this.handleChange}
          />
          {
            this.props.error && <p>{this.props.error.message}</p>
          }
        </form>
        <select
          onChange={this.handleSelectChange}
          value={this.props.selectValue}
        >
          {
            this.props.rates.map(
              rate => <option value={rate.code}>{rate.currency}</option>
            )
          }
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  error: state.exchangeRates.error
})

const mapDispatchToProps = dispatch => ({
  addValue: (userValue) => dispatch(add(userValue)),
  selectCurrency: (selectValue) => dispatch(changeCurrency(selectValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorInputCurrency)