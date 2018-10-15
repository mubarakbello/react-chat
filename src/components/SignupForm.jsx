import React, {Component} from 'react'
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
      passwordCheck: '',
      isEqual: null
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
    }, () => {})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.passwordCheck) {
      this.props.handleSignUp(this.state)
    }
  }

  render() {
    if (this.state.isEqual !== null) {
      // eslint-disable-next-line
      let passwordCheckClassName = this.state.isEqual ? 'correct' : 'wrong'
    }
    return (
      <div className="signup-form">
        <h1>Sign up here</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type='text'
              value={this.state.username}
              placeholder='Username'
              onChange={() => this.handleChange(this.usernameRef)}
              ref={this.usernameRef}
            />
          </div>
          <div>
            <input
              type='text'
              value={this.state.email}
              placeholder='Email'
              onChange={() => this.handleChange(this.emailRef)}
              ref={this.emailRef}
            />
          </div>
          <div>
            <input
              type='password'
              value={this.state.password}
              placeholder='Password...'
              onChange={() => this.handleChange(this.passwordRef)}
              ref={this.passwordRef}
            />
          </div>
          <div>
            <input
              type='password'
              value={this.state.passwordCheck}
              placeholder='Retype password...'
              onChange={() => this.handlePasswordCheck(this.passwordCheckRef)}
              ref={this.passwordCheckRef}
            />
          </div>
          <div>
            <input type='submit' value='Sign Up' />
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm