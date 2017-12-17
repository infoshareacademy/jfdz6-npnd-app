import React from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {connect} from 'react-redux'

import {changeOutputCurrency} from './state/exchangeRates'

class OutputCurrencyList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleSelect = event => {
    console.log(event.target.value)
    const optionField = event.target.value
    this.props.selectOutputCurrency(optionField)
  }

  render() {
    let selected = this.props.rates.filter( e => e.code == this.props.selectOutputValue )[0]
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                      value={this.props.selectOutputValue}>
        <DropdownToggle caret>
          { (selected && selected.currency) || 'Wybierz walutę'}
        </DropdownToggle>
        <DropdownMenu>
          {
            this.props.rates.map(
              rate => <DropdownItem value={rate.code} onClick={this.handleSelect}>{rate.currency}</DropdownItem>
            )
          }
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data,
  selectOutputValue: state.exchangeRates.selectOutputValue
})

const mapDispatchToProps = dispatch => ({
  selectOutputCurrency: (selectOutputValue) => dispatch(changeOutputCurrency(selectOutputValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutputCurrencyList)