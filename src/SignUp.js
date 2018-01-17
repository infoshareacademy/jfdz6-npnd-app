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

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" md={{size: 10, offset: 1}}>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Login</Label>
                <Input name="name" id="name" onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for='userName'>
                  Email:
                </Label>
                <Input
                  name='login'
                  type='userName'
                  onChange={this.handleChange}/>
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
                />
                <FormText color="muted">
                  Hasło musi zawierać co najmniej 6 znaków.
                </FormText>
                <p style={{color: 'red'}}>{this.props.auth.error ? this.props.auth.error.message : null}</p>
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