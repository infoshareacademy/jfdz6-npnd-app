import React, {Component} from 'react';
import './App.css';
import SignUp from './SignUp'

import Calculator from './Calculator'

class App extends Component {
  render() {
    return (
      <div>
        <Calculator/>
        <SignUp/>
      </div>
    );
  }
}

export default App;
