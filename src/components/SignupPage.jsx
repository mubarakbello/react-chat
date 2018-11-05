import React, {Component} from 'react'
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
        firebase.database().ref(`users/${res.user.uid}/profile-details`).set({username})
        firebase.database().ref(`users-list/${res.user.uid}`).set({
          uid: res.user.uid,
          username
        })
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

  closeButtons = () => {
    this.setState({signupError: false})
  }

  render() {
    const ErrorSigningUp = (props) => (
      <div className="Error-signing-up alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> Try signing up again, errors aren't welcomed.
        <button type="button" className="close" aria-label="Close">
          <span aria-hidden="true" onClick={props.close}>&times;</span>
        </button>
      </div>
    )
    return this.state.loading
      ? <Loading size="large" />
      : (
      <div className="container-fluid">
        <div className="Signup-page row justify-content-center">
          <div className="col-md-8 col-sm-10 col-lg-6">
            <h1 className="text-center">Chat Application</h1>
            {this.state.signupError && <ErrorSigningUp close={this.closeButtons} />}
            <SignupForm handleSignUp={this.handleSignUp} />
          </div>
        </div>
      </div>
    )
  }
}

export default SignupPage