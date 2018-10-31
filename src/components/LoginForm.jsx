import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
    } else {
      this.setState({
        usernameEmpty: this.state.username === '' ? true : false,
        passwordEmpty: this.state.password === '' ? true : false
      })
    }
  }

  render() {
    let usernameClassName = '', passwordClassName = ''
    if (this.state.usernameEmpty !== undefined) {
      usernameClassName = this.state.usernameEmpty ? 'is-invalid' : 'is-valid'
    }
    if (this.state.passwordEmpty !== undefined) {
      passwordClassName = this.state.passwordEmpty ? 'is-invalid' : 'is-valid'
    }
    return (
      <div className="Login-form">
        <h3 className="text-center">Log in to your account</h3>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">@</span>
              </div>
              <input
                type="text"
                className={`form-control ${usernameClassName}`}
                id="email"
                placeholder='Enter email'
                aria-describedby="emailHelp"
                value={this.state.username}
                onChange={() => this.handleChange(this.usernameRef)}
                ref={this.usernameRef}
              />
              <div className="valid-feedback">
                Looks good. Make sure it's valid though!
              </div>
              <div className="invalid-feedback">
                Please enter your email.
              </div>
            </div>
            <small id="emailHelp" className="form-text text-muted">
              This is the email address unique to your account
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">#</span>
              </div>
              <input
                type="password"
                className={`form-control ${passwordClassName}`}
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={() => this.handleChange(this.passwordRef)}
                ref={this.passwordRef}
              />
              <div className="valid-feedback">
                Looks good. Make sure it's valid though!
              </div>
              <div className="invalid-feedback">
                Please enter your password.
              </div>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-4">
              <button type="submit" className="btn btn-block btn-primary">Log in</button>
            </div>
            <div className="col-4">
              <Link
                to="/signup"
                role="button"
                className="btn btn-block btn-outline-primary"
              >
                Sign Up instead
              </Link>
            </div>
          </div>
          
        </form>
      </div>
    )
  }
}

export default LoginForm