import React, { Component } from 'react'
import { signUp } from './state/auth'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap'

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
    const { login, password, ...other } = this.state
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
        <p>Ups, ten email jest chyba niepoprawny.</p>
      )
    }
    if (this.props.auth.error.code === 'auth/weak-password') {
      return (
        <p>Ups, to hasło jest ciut za słabe. Na pewno ma co najmniej 6 znaków?</p>
      )
    }
    if (this.props.auth.error.code === 'auth/email-already-in-use') {
      return (
        <p>Już znamy ten adres email. Może po prostu nie pamiętasz hasła?</p>
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
                <Label for="name">Login</Label>
                <Input
                  name="name"
                  id="name"
                  onChange={this.handleChange}
                  required/>
              </FormGroup>
              <FormGroup>
                <Label for='userName'>
                  Email:
                </Label>
                <Input
                  name='login'
                  type='userName'
                  onChange={this.handleChange}
                  required/>
              </FormGroup>
              <FormGroup>
                <Label for='userPassword'>
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
                <p style={{color: 'red'}}>{this.props.auth.error ? this.handleErrorMessages() : null}</p>
                <div className="text-center">
                  <Button type='submit' color='primary' size='lg'style={{marginTop: 30, cursor: 'pointer'}}>Zarejestruj się</Button>
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