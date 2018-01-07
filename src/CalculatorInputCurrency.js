import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Label } from 'reactstrap'
import CurrencyList from './CurrencyList'

import {add} from './state/exchangeRates'
import OutputCurrencyList from './OutputCurrencyList'
import './CalculatorInputCurrency.css'

class CalculatorInputCurrency extends Component {

  handleSubmit = event => {
    event.preventDefault()

    const userInput = this.userInput.value
    this.props.addValue(userInput)
    this.userInput.value = ''
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div className='flex-container'>
            <div className='input-field'>
              <Label for="input">Wpisz kwotę</Label>
              <Input id='input'
                     type='text'
                     ref={item => this.userInput = item}
                     placeholder={this.props.error ? this.props.error.message : this.props.userValue} required/>
            </div>
            <div className='currency-list'>
              <CurrencyList/>
            </div>
            <div className='currency-list'>
              <OutputCurrencyList/>
            </div>
            <div className='submit-button'>
              <Button type="submit" bsSize="lg">Przelicz</Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  error: state.exchangeRates.error,
  userValue: state.exchangeRates.userValue
})

const mapDispatchToProps = dispatch => ({
  addValue: (userValue) => dispatch(add(userValue)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalculatorInputCurrency)