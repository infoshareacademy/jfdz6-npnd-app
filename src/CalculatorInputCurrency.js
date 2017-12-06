import React, {Component} from 'react'
import {connect} from 'react-redux'

import {add} from './state/exchangeRates'

class CalculatorInputCurrency extends Component {
  state = {
    selectValue: 'THB'
  }

  handleChange = event => {
    const formField = event.currentTarget
    const userValue = formField.value
    this.props.addValue(userValue)
  }

  handleSelectChange = event => {
    this.setState({
      selectValue: event.target.value
    })
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
        </form>
        <select onChange={this.handleSelectChange}>
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
  rates: state.exchangeRates.data
})

const mapDispatchToProps = dispatch => ({
  addValue: (userValue) => dispatch(add(userValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorInputCurrency)