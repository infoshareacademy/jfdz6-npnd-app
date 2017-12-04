import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { FormGroup, Label, Input, Button } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getHistoricalCurrencies, resetHistoricalCurrencies } from "./state/historicalExchangeRates";

/*
Aplikacja powinna umożliwić sprawdzenie aktualnego  CURRENT_RATE_Currency(?)
lub
historycznego kursu wybranej waluty. Historical_RATE_Currency(?)

Powinno być możliwe porównanie wizualne zmian kursu w wybranym
okresie za pomocą wykresu.

Wybrane kursy można pobierać na bieżąco z API NBP.
 */

class CurrencyRates extends React.Component {

  state = {
    selectedRate: '',
    startDate: null,
    endDate: null
  }

  handleChange = event => {

    this.setState({
      selectedRate: event.target.value
    })
  }


  handleChangeStart = date => {

    this.setState({
      startDate: date
    })

  }
  handleChangeEnd = date => {
    this.setState({
      endDate: date
    })
  }

  handleHistoricalRates = () => {

    const currencyStartDate = this.state.startDate.format('YYYY-MM-DD')
    const currencyEndDate = this.state.endDate.format('YYYY-MM-DD')
    const currencyId = this.props.rates.filter(e => e.currency === this.state.selectedRate).map(e => e.code)[0]

    this.props.getHistoricalCurrencies(currencyStartDate, currencyEndDate, currencyId)
  }

  componentDidMount() {

    this.props.getCurrencies()
    this.props.resetHistoricalCurrencies()

  }

  render() {
    return (
      <div>
        <h1>Currency Rates</h1>
        <FormGroup>
          <Label for="exampleSelect">Choose currency </Label>
          <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange}>
            {this.props.rates.map(rate => <option>{rate.currency}</option>)}
          </Input>
        </FormGroup>

        Od
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />
        Do
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
        />

        <Button onClick={this.handleHistoricalRates}>
          Show rates
        </Button>
        {this.props.historicalRates.map(e => <p>{e.currency} {e.mid}</p>)}

        {this.props.rates.filter(rate => rate.currency === this.state.selectedRate).map(e =>
          <p> {e.currency} {e.mid}</p>)}


        <h1>###################</h1>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  historicalRates: state.historicalExchangeRates.historicalData
})

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrencies()),
  getHistoricalCurrencies: (currencyStartDate, currencyEndDate, currencyId) => dispatch(getHistoricalCurrencies(currencyStartDate, currencyEndDate, currencyId)),
  resetHistoricalCurrencies: () => dispatch(resetHistoricalCurrencies())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyRates)