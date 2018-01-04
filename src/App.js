import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyRates from './CurrencyRates'
import Wallet from './Wallet'
import Calculator from './Calculator'
import Market from './Market'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Nav, NavItem, NavLink, Navbar } from 'reactstrap';
import SignOut from './SignOut'



const App = () => (
      <Router>
        <div>
          <Navbar full light>
            <SignOut/>
            <Nav className="pull-xs-right" navbar>
              <NavItem>
                <NavLink tag={Link} to="/Wallet">Wallet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/Market">Market</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/CurrencyRates">Currency Rates</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/Calculator">Calculator</NavLink>
              </NavItem>
            </Nav>
          </Navbar>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route path="/Wallet" component={Wallet}/>
          <Route path="/Market" component={Market}/>
          <Route path="/CurrencyRates" component={CurrencyRates}/>
          <Route path="/Calculator" component={Calculator}/>
        </div>
      </Router>
)

      const Home = () => (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      )


export default App;
