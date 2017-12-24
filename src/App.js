import React, {Component} from 'react'
import './App.css'
import Calculator from './Calculator'
import WelcomeScreen from './WelcomeScreen'

class App extends Component {
  render() {
    return (
      <div>
        <WelcomeScreen/>
        <Calculator/>
      </div>
    );
  }
}

export default App;
