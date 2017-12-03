import React, { Component } from 'react'

class CalculatorOutputCurrency extends Component {
  render() {
    return (
      <div>
        <form>
          <input type='text'/>
        </form>
        <select>
          <option value='PLN'>PLN</option>
        </select>
      </div>
    )
  }
}

export default CalculatorOutputCurrency