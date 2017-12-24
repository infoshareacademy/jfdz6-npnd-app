import React, {Component} from 'react'
import {signUp} from './state/auth'
import {connect} from 'react-redux'

class SignUp extends Component {
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
    this.props.signUp(
      this.state.login,
      this.state.password
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.props.auth.data && this.props.auth.email}</p>
        <label>
          Login:
        </label>
        <input
          name='login'
          type='text'
          onChange={this.handleChange}/>
        <label>
          Password:
        </label>
        <input
          name='password'
          type="password"
          onChange={this.handleChange}/>
        <button type='submit'>Sign up</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signUp(email, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)