import React from 'react'
import { connect } from 'react-redux'
import { getCurrencies } from "./state/exchangeRates"
import { FormGroup, Label, Input, Button, Table } from 'reactstrap'


/*
Zalogowany użytkownik powinien móc dodać i zarządzać swoim portfelem walut.

Portfel prezentuje zmianę wartości, zysku lub straty

naszego portfela w stosunku do daty zakupu (dodania wpisu do portfela).

Jeśli od momentu zakupu waluta ma najwyższą wartość kursu
użytkownik powinien zobaczyć komunikat o potencjalnej korzyści ze sprzedaży.
 */

class Wallet extends React.Component {

  state = {
    selectedRate: ''
  }

  handleChange = event => {

    this.setState({
      selectedRate: event.target.value
    })
  }

  render() {
    return(
      <div>
        <h1>My Wallet</h1>
        <FormGroup>
          <Label for="exampleSelect">Choose currency </Label>
          <Input type="select" name="select" id="exampleSelect" placeholder="-" onChange={this.handleChange}>
            {this.props.rates.map(rate => <option>{rate.currency}</option>)}
          </Input>
        </FormGroup>

        {
          this.props.rates.filter(rate => rate.currency === this.state.selectedRate)
            .map(e => <p> {e.currency} {e.mid}</p>)
        }
        <Table hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Currency</th>
            <th>Today rates</th>
            <th>Date of buy</th>
            <th>Price You paid</th>
            <th>Delta</th>
            <th>Recommendation</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td>@twitter</td>
          </tr>
          </tbody>
        </Table>

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
  mapDispatchToProps) (Wallet)