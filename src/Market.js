import React from 'react'
import {connect} from 'react-redux'
import {getCurrencies} from "./state/exchangeRates"
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'


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


  toggle = event => {
    event = event.currentTarget
    console.log(event.props)

    this.setState({
      modal: !this.state.modal
    });
  }


  render() {
    return (
      <div>
        <h1>Market</h1>


        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Buy</ModalHeader>
          <ModalBody>
            Hello there

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
              onClick={this.toggle}
              key={rate.code}
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