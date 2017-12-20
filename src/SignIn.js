import React, {Component} from 'react'
import firebase from 'firebase'

class SignIn extends Component {
  state ={
    login:'',
    password:''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Login:
        <input
          name='login'
          onChange={this.handleChange}/>
        Password:
        <input
          name='password'
          type="password"
          onChange={this.handleChange}/>
        <button>Sign in</button>
      </form>
    )
  }
}

export default SignIn