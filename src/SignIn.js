import React, {Component} from 'react'
import {signIn} from './state/auth'
import {connect} from 'react-redux'

class SignIn extends Component {
  state = {
    login: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signIn(
      this.state.login,
      this.state.password)
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

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)