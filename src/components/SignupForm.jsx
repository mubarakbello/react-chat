import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    // create refs for input fields
    this.emailRef = React.createRef()
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
    this.passwordCheckRef = React.createRef()
    // set initial state
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordCheck: ''
    }
  }

  // propTypes declaration for <SignupForm /> component
  static propTypes = {
    handleSignUp: PropTypes.func
  }

  handleChange = (elementRef) => {
    let key
    switch (elementRef) {
      case this.emailRef:
        key = 'email'
        break;
      case this.usernameRef:
        key = 'username'
        break;
      case this.passwordRef:
        key = 'password'
        break;
      default:
        break;
    }
    this.setState(() => ({
      [key] : elementRef.current.value
    }))
  }

  handlePasswordCheck = (elementRef) => {
    this.setState({
      passwordCheck: elementRef.current.value
    }, () => {
      this.setState({
        isEqual: this.state.password === this.state.passwordCheck ? true : false
      }, () => console.log(`isEqual: ${this.state.isEqual}`))
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password===this.state.passwordCheck && this.state.email !== '' && this.state.username !== '' && !this.state.username.includes(' ') && this.state.password.length > 5) {
      this.props.handleSignUp(this.state)
    } else {
      this.setState({
        usernameEmpty: this.state.username === '' ? true : false,
        emailEmpty: this.state.email === '' ? true : false,
        passwordEmpty: this.state.password === '' ? true : false,
        isEqual: this.state.password === this.state.passwordCheck
      })
    }
  }

  render() {
    let passwordCheckClassName = ''
    if (this.state.isEqual !== undefined) {
      passwordCheckClassName = this.state.isEqual && this.state.passwordCheck !== ''
        ? 'is-valid' : 'is-invalid'
    } else {
      if (this.state.password !== '' && this.state.passwordCheck === '') {
        passwordCheckClassName = 'is-invalid'
      }
    }
    let usernameClassName = '', emailClassName = '', passwordClassName = ''
    if (this.state.usernameEmpty !== undefined) {
      usernameClassName = this.state.usernameEmpty || this.state.username.includes(' ') ? 'is-invalid' : 'is-valid'
    }
    if (this.state.emailEmpty !== undefined) {
      emailClassName = this.state.emailEmpty ? 'is-invalid' : 'is-valid'
    }
    if (this.state.passwordEmpty !== undefined) {
      passwordClassName = this.state.passwordEmpty ? 'is-invalid' : 'is-valid'
    }
    if (this.state.password.length < 6 && this.state.isEqual !== undefined) passwordClassName = 'is-invalid'
    return (
      <div className="Signup-form">
        <h3 className="text-center">Sign up to get an account</h3>
        <small className="text-center">You can sign up with a dummy mail but make sure you remember your password!</small>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">$</span>
              </div>
              <input
                type='text'
                className={`form-control ${usernameClassName}`}
                id="username"
                placeholder='Enter a username'
                aria-describedby="usernameHelp"
                value={this.state.username}
                onChange={() => this.handleChange(this.usernameRef)}
                ref={this.usernameRef}
              />
              <div className="valid-feedback">
                Looks good. Make sure it's valid though!
              </div>
              <div className="invalid-feedback">
                Please choose a username with no spaces in between.
              </div>
            </div>
            <small id="usernameHelp" className="form-text text-muted">
              Make sure to leave no space in between
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">@</span>
              </div>
              <input
                type='text'
                className={`form-control ${emailClassName}`}
                id="email"
                placeholder='Enter a valid email'
                aria-describedby="emailHelp"
                value={this.state.email}
                onChange={() => this.handleChange(this.emailRef)}
                ref={this.emailRef}
              />
              <div className="valid-feedback">
                Looks good. Make sure it's valid though!
              </div>
              <div className="invalid-feedback">
                You need to enter a valid email.
              </div>
            </div>
            <small id="emailHelp" className="form-text text-muted">
              This email address will be unique to your account
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">#</span>
              </div>
              <input
                type='password'
                className={`form-control ${passwordClassName}`}
                id="password"
                placeholder='Choose a password'
                value={this.state.password}
                onChange={() => this.handleChange(this.passwordRef)}
                ref={this.passwordRef}
              />
              <div className="valid-feedback">
                Looks good. Make sure it's strong enough though!
              </div>
              <div className="invalid-feedback">
                This field must contain 6 or more characters.
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="retypePassword">Retype password</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">#</span>
              </div>
              <input
                type='password'
                className={`form-control ${passwordCheckClassName}`}
                id="retypePassword"
                placeholder='Retype the password'
                value={this.state.passwordCheck}
                onChange={() => this.handlePasswordCheck(this.passwordCheckRef)}
                ref={this.passwordCheckRef}
              />
              <div className="valid-feedback">
                Looks good. Make sure it's strong enough though!
              </div>
              <div className="invalid-feedback">
                Password must match the first one provided.
              </div>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-4">
              <button type="submit" className="btn btn-block btn-primary">Sign up</button>
            </div>
            <div className="col-4">
              <Link
                to="/login"
                role="button"
                className="btn btn-block btn-outline-primary my-btnn"
              >
                or Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm