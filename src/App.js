import React, {Component} from 'react'
import './App.css'
import SignUp from './SignUp'
import SignIn from './SignIn'

import Calculator from './Calculator'

class App extends Component {
  render() {
    return (
      <div>
        <Calculator/>
        <SignUp/>
        <SignIn/>
      </div>
    );
  }
}

export default App;
