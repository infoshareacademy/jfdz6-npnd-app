import React, { Component } from 'react'
import { signOut } from './state/auth'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import './SignOut.css'

class SignOut extends Component {

  handleSignOut = () => {
    this.props.signOut()
  }

  render() {
    return (
      <Button id='signOutButton' type='submit' color='primary' size='lg' onClick={this.handleSignOut}>Wyloguj się</Button>
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