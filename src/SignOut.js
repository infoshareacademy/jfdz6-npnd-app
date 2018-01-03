import React, {Component} from 'react'
import {signOut} from './state/auth'
import {connect} from 'react-redux'

class SignOut extends Component {

  handleSignOut = () => {
    this.props.signOut()
  }

  render() {
    return (
      <button type='submit' onClick={this.handleSignOut}>Wyloguj się</button>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOut)