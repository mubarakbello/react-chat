import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import Loading from "./Loading";

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginError: false,
      loading: false
    }
  }

  static propTypes = {
    authed: PropTypes.bool,
    changeAuthState: PropTypes.func
  }

  loadingMode = () => {
    this.setState(() => ({
      loading: true
    }))
  }

  handleLogin = ({username, password}) => {
    this.loadingMode()
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(res => {
        console.log(res)
        this.props.changeAuthState()
      })
      .catch(err => {
        console.log(err)
        this.setState(() => ({
          loginError: true,
          loading: false
        }))
      })
  }

  render() {
    const UserLoggedIn = () => (
      <div className="user-logged-in">
        <span>
          You are already logged in. 
          <Link to="/">Proceed to your account here</Link>
        </span>
      </div>
    )
    const ErrorLoggingIn = () => (
      <div className="error-logging-in">
        <span>Error logging you in. Try again</span>
      </div>
    )
    return this.state.loading
      ? <Loading />
      : (
      <div>
        <h1>This is the login page</h1>
        {this.props.authed && <UserLoggedIn />}
        {this.state.loginError && <ErrorLoggingIn />}
        <LoginForm handleLogin={this.handleLogin} />
        <div>
          <Link to="/signup">
            <button className="btn btn-primary">Sign Up</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default LoginPage