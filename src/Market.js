import React from 'react'
import {connect} from 'react-redux'
import {getCurrencies} from "./state/exchangeRates"
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input} from 'reactstrap'


/*
Zalogowany użytkownik powinien móc dodać i zarządzać swoim portfelem walut.

Portfel prezentuje zmianę wartości, zysku lub straty

naszego portfela w stosunku do daty zakupu (dodania wpisu do portfela).

Jeśli od momentu zakupu waluta ma najwyższą wartość kursu
użytkownik powinien zobaczyć komunikat o potencjalnej korzyści ze sprzedaży.
 */

class Market extends React.Component {

  state = {
    modal: false,
    selectedCurrency: '',
    selectedRate: null,
    result: null
  }


  toggleModal = event => {

    const target = event.currentTarget
    const selectedCurrency = target.dataset.itemId
    const selectedRate = this.props.rates.filter(rate =>
      rate.code === selectedCurrency
    ).map( e => e.mid)

    console.log(selectedRate)
    this.setState({
      selectedCurrency: selectedCurrency,
      modal: !this.state.modal,
      selectedRate: selectedRate
    });
  }

  handleChange = event => {

    const currencyQuantity = event.target.value
    const result = currencyQuantity * this.state.selectedRate

    this.setState({
      result: result
    })


  }

  closeModal = () => {
    this.setState({
      modal: false,
      selectedCurrency: '',
      selectedRate: null,
      result: null
    })
  }


  render() {
    return (
      <div>
        <h1>Market</h1>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Buy - {this.state.selectedCurrency}</ModalHeader>
          <ModalBody>
            <FormGroup>
              {
                this.state.selectedCurrency
              } - {
              this.props.rates.filter(
                rate =>
                  rate.code === this.state.selectedCurrency
              ).map(
                e =>
                  <span> {e.currency} - {e.mid}</span>)
            }
              <Input type="number" name="number" id="exampleSelect" placeholder="How much?" onChange={this.handleChange} >
              </Input>
              {(this.state.result !== null) ? `Będzie trza zapłacić  ${this.state.result} zł` : 'nie uda się' }



            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.closeModal}>Close</Button>
          </ModalFooter>
        </Modal>

        <Table hover size="sm" responsive>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rates</th>
            <th>Trend?</th>
          </tr>
          </thead>
          <tbody>
          {this.props.rates.map(
            rate => <tr
              key={rate.code}
              onClick={this.toggleModal}
              data-item-id={rate.code}
            >
              {rate.code}
              <td>
                {
                  this.props.rates.filter(rate2 => rate2.code === rate.code)
                    .map(e => <span key={e.code}> {e.mid}</span>)
                }
              </td>
            </tr>)}
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
  mapDispatchToProps)(Market)