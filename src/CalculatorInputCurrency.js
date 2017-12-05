import React, {Component} from 'react'
import { connect } from 'react-redux'

class CalculatorInputCurrency extends Component {
  state = {
    userValue: null,
    selectValue: 'THB'
  }

  handleChange = event => {
    const formField = event.currentTarget
    const userValue = formField.value
    this.setState({
      userValue
    })
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
            value={this.state.userValue}
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

export default connect(
  mapStateToProps
)(CalculatorInputCurrency)