import React, {Component} from 'react'

class SignUp extends Component {
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
    console.log(this.state)
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
        <button>Sign up</button>
      </form>
    )
  }
}

export default SignUp