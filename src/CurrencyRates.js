import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { FormGroup, Label, Input, Button } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getHistoricalCurrencies, resetHistoricalCurrencies } from "./state/historicalExchangeRates"
import { Line } from 'react-chartjs-2';

/*
Aplikacja powinna umożliwić sprawdzenie aktualnego  CURRENT_RATE_Currency(?)
lub
historycznego kursu wybranej waluty. Historical_RATE_Currency(?)

Powinno być możliwe porównanie wizualne zmian kursu w wybranym
okresie za pomocą wykresu.

Wybrane kursy można pobierać na bieżąco z API NBP.
 */

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [3,4,2]
    }
  ]
}

class CurrencyRates extends React.Component {

  state = {
    selectedCurrency: '',
    startDate: null,
    endDate: null,
    getting: false,
    error: null
  }

  handleChange = event => {

    this.setState({
      selectedCurrency: event.target.value
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
    const currencyId = this.props.rates.filter(e => e.currency === this.state.selectedCurrency).map(e => e.code)[0]

    this.props.getHistoricalCurrencies(currencyStartDate, currencyEndDate, currencyId)
  }

  componentDidMount() {

    this.props.getCurrencies()
    this.props.resetHistoricalCurrencies()
  }

  render() {

    const chartData = {
      ...data,
      labels: this.props.historicalRates.map(e => e.effectiveDate),
      datasets: [ {
        ...data.datasets[0],
        data: this.props.historicalRates.map(e => e.mid),
        label: this.state.selectedCurrency
      }
      ]
    }

    return (



      <div>
        <h1>Currency Rates</h1>
        <FormGroup>
          <Label for="exampleSelect">Choose currency </Label>
          <Input type="select" name="select" id="exampleSelect" placeholder="-" onChange={this.handleChange}>
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

        {
          this.props.rates.filter(rate => rate.currency === this.state.selectedCurrency)
                          .map(e => <p> {e.currency} {e.mid}</p>)
        }

        <Line data={chartData} />

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