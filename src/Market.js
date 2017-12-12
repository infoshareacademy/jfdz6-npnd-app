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
    selectedRate: ''
  }


  toggleModal = event => {

    const target = event.currentTarget
    const selectedCurrency = target.dataset.itemId

    this.setState({
      selectedRate: selectedCurrency,
      modal: !this.state.modal
    });
  }

  closeModal = () => {
    this.setState({
      modal: false,
      selectedRate: ''
    })
  }


  render() {
    return (
      <div>
        <h1>Market</h1>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Buy - {this.state.selectedRate}</ModalHeader>
          <ModalBody>
            <FormGroup>
              {
                this.state.selectedRate
              } - {
                this.props.rates.filter
                    (rate =>
                      rate.code === this.state.selectedRate
                    ).map
                    (e =>
                      <span> {e.currency}</span>)
                   }
              <Input type="number" name="number" id="exampleSelect" placeholder="How much?">
              </Input>
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