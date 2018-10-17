import React, {Component} from 'react'
import PropTypes from 'prop-types'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    // Created refs for form elements here
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
    // Initial state declaration
    this.state = {
      username: this.props.username || '',
      password: this.props.password || ''
    }
  }

  static propTypes = {
    handleLogin: PropTypes.func
  }

  handleChange = (elementRef) => {
    let key = elementRef === this.usernameRef ? 'username' : 'password'
    this.setState(() => ({
      [key] : elementRef.current.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.handleLogin(this.state)
    }
  }

  render() {
    return (
      <div className="login-form">
        <h1>Login here</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.username}
              placeholder='Email'
              onChange={() => this.handleChange(this.usernameRef)}
              ref={this.usernameRef}
            />
          </div>
          <div>
            <input
              type="password"
              value={this.state.password}
              onChange={() => this.handleChange(this.passwordRef)}
              ref={this.passwordRef}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Log in"
            />
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm