import React, { Component } from 'react';
import './App.css';
import CurrencyRates from './CurrencyRates'
import Wallet from './Wallet'
import Calculator from './Calculator'
import Market from './Market'
import {
  BrowserRouter as Router,
  Route } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import SignOut from './SignOut'


class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
    <Router>
      <div>

        <Navbar color="faded" light expand="md">
          <SignOut/>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/calculator">Kalkulator</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/currencyRates">Kursy walut</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/wallet">Portfel</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/market">Rynek</NavLink>
              </NavItem>


            </Nav>
          </Collapse>
        </Navbar>

        <Route path="/calculator" component={Calculator}/>
        <Route path="/currencyRates" component={CurrencyRates}/>
        <Route path="/wallet" component={Wallet}/>
        <Route path="/market" component={Market}/>

      </div>
    </Router>
    )
  }

}

export default App;
