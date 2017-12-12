import React from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {connect} from 'react-redux'

import {changeCurrency} from './state/exchangeRates'

class Example extends React.Component {
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

  handleSelectChange = event => {
    const optionField = event.target.value
    this.props.selectCurrency(optionField)
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}
                      onChange={this.handleSelectChange}
                      value={this.props.selectValue}>
        <DropdownToggle caret>
          Wybierz walutę
        </DropdownToggle>
        <DropdownMenu>
          {/*<DropdownItem>teks</DropdownItem>*/}
          {
            this.props.rates.map(
              rate => <DropdownItem value={rate.code}>{rate.currency}</DropdownItem>
            )
          }
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

const mapStateToProps = state => ({
  rates: state.exchangeRates.data
})

const mapDispatchToProps = dispatch => ({
  selectCurrency: (selectValue) => dispatch(changeCurrency(selectValue))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Example)