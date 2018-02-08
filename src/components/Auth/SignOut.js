import React, { Component } from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import Octicon from 'react-octicon'

import { signOut } from '../../state/auth'
import WelcomePage from '../WelcomePage/WelcomePage'

import './SignOut.css'

class SignOut extends Component {

  handleSignOut = () => {
    this.props.signOut()
    window.open('WelcomePage', '_self')
  }

  render() {
    return (
      <Media query="(max-width: 576px)">
        {matches => matches ? (
          <Button id='signOutButton' type='submit' size='md'
                  onClick={this.handleSignOut}><Octicon name='sign-out'/></Button>) : (
          <Button id='signOutButton' type='submit' size='lg' onClick={this.handleSignOut}>Wyloguj
            się</Button>)}
      </Media>
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