import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col} from 'reactstrap'

import {signUp} from '../../state/auth'

import './SignUp.css'

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
    const {login, password, ...other} = this.state
    event.preventDefault()
    this.props.signUp(
      this.state.login,
      this.state.password,
      other
    )
  }

  handleErrorMessages = () => {
    if (this.props.auth.error.code === 'auth/invalid-email') {
      return (
        <p className='text-black'>Ups, ten email jest chyba niepoprawny.</p>
      )
    }
    if (this.props.auth.error.code === 'auth/weak-password') {
      return (
        <p className='text-black'>Ups, to hasło jest ciut za słabe. Na pewno ma co najmniej 6 znaków?</p>
      )
    }
    if (this.props.auth.error.code === 'auth/email-already-in-use') {
      return (
        <p className='text-black'>Już znamy ten adres email. Może po prostu nie pamiętasz hasła?</p>
      )
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{size: 10, offset: 1}}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label className='text-black' for="name">Login</Label>
                <Input
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  required/>
              </FormGroup>
              <FormGroup>
                <Label className='text-black' for='userName'>
                  Email:
                </Label>
                <Input
                  name='login'
                  type='userName'
                  onChange={this.handleChange}
                  required/>
              </FormGroup>
              <FormGroup>
                <Label className='text-black' for='userPassword'>
                  Hasło:
                </Label>
                <Input
                  name='password'
                  type="password"
                  id='userPassword'
                  onChange={this.handleChange}
                  required
                />
                <FormText color="muted">
                  Hasło musi zawierać co najmniej 6 znaków.
                </FormText>
                {this.props.auth.error ? this.handleErrorMessages() : null}
                <div className="text-center">
                  <Button type='submit' color='primary' size='lg' className='sign-up-button'>Zarejestruj się</Button>
                </div>
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
  signUp: (email, password, other) => dispatch(signUp(email, password, other))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)