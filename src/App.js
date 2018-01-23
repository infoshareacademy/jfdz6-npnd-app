import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import CurrencyRates from './CurrencyRates'
import Wallet from './Wallet'
import Calculator from './Calculator'
import Market from './Market'
import {
  BrowserRouter as Router,
  Route,
  Link} from 'react-router-dom'
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
          <h1>Witaj {this.props.auth.data.displayName}</h1>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/calculator">Kalkulator</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/currencyRates">Kursy walut</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/wallet">Portfel</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/market">Rynek</NavLink>
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

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)
