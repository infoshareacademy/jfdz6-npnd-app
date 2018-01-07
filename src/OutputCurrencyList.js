import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'

import {changeOutputCurrency} from './state/exchangeRates'

class OutputCurrencyList extends React.Component {

  handleSelect = event => {
    const optionField = event.target.value
    this.props.selectOutputCurrency(optionField)
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="inputCurrency">Wybierz walutę, na którą chcesz przeliczyć</Label>
          <Input type="select"
                 name="select"
                 id="inputCurrency"
                 value={this.props.selectOutputValue}
                 onChange={this.handleSelect}>
            {
              this.props.rates.map(
                rate => <option
                  value={rate.code}
                  key={rate.code}>
                  {rate.currency}
                  </option>
              )
            }
          </Input>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  selectOutputValue: state.exchangeRates.selectOutputValue
})

const mapDispatchToProps = dispatch => ({
  selectOutputCurrency: (selectOutputValue) => dispatch(changeOutputCurrency(selectOutputValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutputCurrencyList)