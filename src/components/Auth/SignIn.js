import React, { Component } from 'react'
import { signIn } from '../../state/auth'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'
import ModalSignUp from './ModalSignUp'

class SignIn extends Component {
  state = {
    login: '',
    password: ''
  }

  handleErrorMessages = () => {
    if (this.props.auth.error.code === 'auth/user-not-found') {
      return (
        <p>Ups, chyba Cię nie znamy</p>
      )
    }
    if (this.props.auth.error.code === 'auth/wrong-password') {
      return (
        <p>Ups, to hasło jest chyba niepoprawne</p>
      )
    }
    if (this.props.auth.error.code === 'auth/invalid-email') {
      return (
        <p>Ups, ten email jest chyba niepoprawny</p>
      )
    }
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
      <Container className='container'>
        <Row>
          <Col sm='12' md={{size: 6, offset: 3}} className='border rounded'>
            <Form onSubmit={this.handleSubmit} style={{paddingTop: 20}}>
              <FormGroup>
                <Label for="userEmail">
                  Email:
                </Label>
                <Input
                  name='login'
                  type='email'
                  id='userEmail'
                  onChange={this.handleChange}
                  autoFocus
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for='userPassword'>
                  Hasło:
                </Label>
                <Input
                  name='password'
                  type='password'
                  id='userPassword'
                  onChange={this.handleChange}
                  required/>
                <div className='text-center'>
                  <Button type='submit' color='primary' size='lg' style={{marginTop: 30, cursor: 'pointer'}}>Zaloguj się</Button>
                  <p style={{color: 'red'}}>{this.props.auth.error ? this.handleErrorMessages() : null}</p>
                </div>
                <p style={{marginTop: 50}} className='text-center'>Nie masz jeszcze konta? Zarejestruj się teraz!</p>
                <ModalSignUp/>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
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