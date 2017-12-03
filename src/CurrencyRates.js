import React from 'react'
import {connect} from 'react-redux'

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



  componentDidMount() {
    fetch('http://api.nbp.pl/api/exchangerates/tables/A?format=json')
      .then(
        response => response.json()
      ).then(data => console.log(data[0].rates))
  }

  render() {
    return (
      <div>Currency Rates</div>

    )
  }
}


export default CurrencyRates