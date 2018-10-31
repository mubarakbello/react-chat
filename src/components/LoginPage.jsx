import React, {Component} from 'react'
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

  closeButtons = () => {
    this.setState({loginError: false})
  }

  render() {
    const ErrorLoggingIn = (props) => (
      <div className="Error-signing-in container alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> Errors aren't welcomed, so check the details you entered or your network.
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true" onClick={props.close}>&times;</span>
        </button>
      </div>
    )
    return this.state.loading
      ? <Loading text="Login Page" />
      : (
      <div className="container-fluid">
        <div className="Login-page row justify-content-center">
          <div className="col-md-8 col-sm-10 col-lg-6">
            <h1 className="text-center">Chat Application</h1>
            {this.state.loginError && <ErrorLoggingIn close={this.closeButtons} />}
            <LoginForm handleLogin={this.handleLogin} />
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage