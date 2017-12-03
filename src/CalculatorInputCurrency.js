import React, {Component} from 'react'

class CalculatorInputCurrency extends Component {
  render() {
    return (
      <div>
        <form>
          <input type='text'/>
        </form>
        <select>
          <option value='PLN'>PLN</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='CHF'>CHF</option>
        </select>
      </div>
    )
  }
}

export default CalculatorInputCurrency