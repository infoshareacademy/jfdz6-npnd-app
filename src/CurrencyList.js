import React from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {connect} from 'react-redux'

import {changeCurrency} from './state/exchangeRates'

class CurrencyList extends React.Component {
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
    const optionField = event.target.value
    this.props.selectCurrency(optionField)
  }

  render() {
    let selected = this.props.rates.filter( e => e.code == this.props.selectValue )[0]
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                      value={this.props.selectValue}>
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
  selectValue: state.exchangeRates.selectValue
})

const mapDispatchToProps = dispatch => ({
  selectCurrency: (selectValue) => dispatch(changeCurrency(selectValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyList)