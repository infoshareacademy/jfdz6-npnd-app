import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies} from "./state/exchangeRates"
import { FormGroup, Label, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import  moment from 'moment'

/*
Aplikacja powinna umożliwić sprawdzenie aktualnego  CURRENT_RATE_Currency(?)
lub
historycznego kursu wybranej waluty. Historical_RATE_Currency(?)


Currency Redux ducks

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
    console.log(event.target.value)
    this.setState( {
      selectedRate: event.target.value
    })
  }

  handleChangeStart = date => {
    this.setState({
      startDate: date
    })
    console.log('start', date.format('YYYY-MM-DD'))

  }
  handleChangeEnd = date => {
    this.setState({
      endDate: date
    })
    console.log('end', date.format('YYYY-MM-DD'))
  }


  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A?format=json')
      .then(
        response => response.json()
      ).then(data => this.setState({rates: (data[0].rates)}))
  }

  render() {
    return (
      <div>
        <h1>Currency Rates</h1>
        <FormGroup>
          <Label for="exampleSelect">Choose currency </Label>
          <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange} >
            {this.props.rates.map(rate => <option>{rate.currency}</option>)}
          </Input>
        </FormGroup>


        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />

        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
        />
        {this.props.rates.filter(rate => rate.currency === this.state.selectedRate ).map( e =><p> {e.currency}  {e.mid}</p>)}

        <h1>###################</h1>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data
})

const mapDispatchToProps = dispatch => ({
  getCurrencies: () => dispatch(getCurrencies())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (CurrencyRates)