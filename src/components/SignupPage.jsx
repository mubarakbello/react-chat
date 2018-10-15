import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import PropTypes from 'prop-types'
import SignupForm from './SignupForm'
import Loading from "./Loading";

class SignupPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signupError: false,
      loading: false
    }
  }

  static propTypes = {
    userLoggedIn: PropTypes.bool,
    changeAuthState: PropTypes.func
  }

  loadingMode = () => {
    this.setState(() => ({
      loading: true
    }))
  }

  handleSignUp = ({email, username, password}) => {
    this.loadingMode()
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)
        firebase.database().ref('users/' + res.user.uid).set({username})
        this.props.changeAuthState()
      })
      .catch(err => {
        console.log(err)
        this.setState(() => ({
          signupError: true,
          loading: false
        }))
      })
  }

  render() {
    // eslint-disable-next-line
    const UserLoggedIn = () => (
      <div className="user-logged-in">
        <span>
          You are already logged in. 
          <Link to="/">Proceed to your account here</Link>
        </span>
      </div>
    )
    const ErrorSigningUp = () => (
      <div className="error-signing-up">
        <span>Error signing you up. Try again</span>
      </div>
    )
    return this.state.loading
      ? <Loading />
      : (
      <div>
        <h1>This is the Signup page</h1>
        {this.state.signupError && <ErrorSigningUp />}
        <SignupForm handleSignUp={this.handleSignUp} />
        <div>
          <Link to="/login">
            <button className="btn btn-primary">Log in</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default SignupPage