import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import {connect} from 'react-redux'
import {changeCurrency} from './state/exchangeRates'

class CurrencyList extends React.Component {

  handleSelect = event => {
    const optionField = event.target.value
    this.props.selectCurrency(optionField)
  }
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="inputCurrency">Wybierz walutę, z której chcesz przeliczyć</Label>
          <Input type="select"
                 name="select"
                 id="inputCurrency"
                 value={this.props.selectValue}
                 onChange={this.handleSelect}>
            {
              this.props.rates.map(
                rate => <option value={rate.code}>{rate.currency}</option>
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
  selectValue: state.exchangeRates.selectValue
})

const mapDispatchToProps = dispatch => ({
  selectCurrency: (selectValue) => dispatch(changeCurrency(selectValue))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyList)