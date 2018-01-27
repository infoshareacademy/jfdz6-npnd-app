import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { FormGroup, Label, Input, Button } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getHistoricalCurrencies, resetHistoricalCurrencies } from "./state/historicalExchangeRates"
import { Line } from 'react-chartjs-2';
import './CurrencyRates.css'


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(211, 18, 18,0.4)',
      borderColor: 'rgba(211, 18, 18,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(211, 18, 18,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(211, 18, 18,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [3, 4, 2]
    }
  ]
}

class CurrencyRates extends React.Component {

  state = {
    selectedCurrency: null,
    startDate: null,
    endDate: null,
    getting: false,
    error: null
  }

  handleChange = event => {


    this.setState({
      selectedCurrency: event.target.value
    }, () => this.handleHistoricalRates())

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

    let myState = this.state.selectedCurrency

    const currencyStartDate = this.state.startDate.format('YYYY-MM-DD')
    const currencyEndDate = this.state.endDate.format('YYYY-MM-DD')

    const currencyId = this.props.rates.filter(e => e.currency === myState).map(e => e.code)[0]

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
      datasets: [{
        ...data.datasets[0],
        data: this.props.historicalRates.map(e => e.mid),
        label: this.state.selectedCurrency
      }
      ]
    }

    return (



      <div
        style={{textAlign: 'center'}}
      >
        <h2>Kursy walut</h2>

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

        {
          this.state.startDate !== null && this.state.endDate !== null ?
            <div>
              <FormGroup>
                <Label for="exampleSelect">Wybierz walutę </Label>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  placeholder="-"
                  onChange={this.handleChange}
                >
                  {this.props.rates.map(rate => <option>{rate.currency}</option>)}
                  <option selected>-</option>
                </Input>
                {
                  this.props.rates.error && <p>{this.props.rates.error.message}</p>
                }
              </FormGroup>
              <Button onClick={this.handleHistoricalRates}>
                Pokaż kurs
              </Button>
            </div>
            : null
        }
        {
          this.props.rates.filter(rate => rate.currency === this.state.selectedCurrency)
            .map(e => <p> Aktualny kurs {e.currency} {e.mid}</p>)
        }

        {
          this.state.selectedCurrency !== null &&
          this.state.endDate !== null &&
          this.state.startDate !== null ?
            <div style={{backgroundColor: 'rgba(236, 236, 236, 0.75)'}}>
              <Line
              data={chartData}
            />
            </div>:
            null
        }

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