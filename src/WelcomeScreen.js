import React, {Component} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

class WelcomeScreen extends Component {
  render() {
    return (
      <div>
        <SignUp/>
        <SignIn/>
      </div>
    )
  }
}

export default WelcomeScreen