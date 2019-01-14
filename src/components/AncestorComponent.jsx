import React, { Component, createContext } from 'react'
import {Switch} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import {PrivateRoute, PublicRoute} from './SpecialRoutes'
import {initializeFirebase} from '../config'
import HomeContainer from './HomeContainer'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import Loading from './Loading';

const UserContext = createContext(null)

class AncestorComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authed: false,
      user: null,
      loading: true
    }
  }

  changeAuthState = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // get username and append to user object
        firebase.database().ref(`/users/${user.uid}/profile-details/username`).once('value').then(snapshot => {
          this.setState(() => ({
            authed: true,
            loading: false,
            user: {...user, username: snapshot.val()}
          }))
        })
        const presenceRef = firebase.database().ref(`/users/${user.uid}/profile-details/active`)
        firebase.database().ref('/.info/connected').on('value', function(snapshot) {
          if (snapshot.val()) {
            presenceRef.onDisconnect().set(false)
            presenceRef.set(true)
          }
        })
      } else {
        this.setState(() => ({
          authed: false,
          loading: false,
          user
        }))
      }
    });
  }

  handleLogout = () => {
    firebase.auth().signOut()
      .then(() => this.changeAuthState())
      .catch((err) => {
        console.log(err)
        this.changeAuthState()
      })
  }

  componentDidMount() {
    // initializeFirebase()
    this.changeAuthState()
  }

  componentWillMount() {
    // initializeFirebase()
    initializeFirebase()
  }

  componentWillUnmount() {
    if (this.state.user !== null) {
      const presenceRef = firebase.database().ref(`/users/${this.state.user.uid}/profile-details/active`)
      firebase.database().ref('/.info/connected').on('value', function(snapshot) {
        if (snapshot.val()) {
          presenceRef.onDisconnect().set(false)
          presenceRef.set(true)
        }
      })
    }
  }

  render() {
    return this.state.loading
      ? <Loading size="large" />
      : (
      <div className="App">
        <UserContext.Provider value={this.state.user}>
          <Switch>
            <PublicRoute
              authed={this.state.authed}
              exact path="/login"
              component={LoginPage}
              changeAuthState={this.changeAuthState}
            />
            <PublicRoute
              authed={this.state.authed}
              exact path="/signup"
              component={SignupPage}
              changeAuthState={this.changeAuthState}
            />
            <PrivateRoute
              authed={this.state.authed}
              path="/"
              component={HomeContainer}
              handleLogout={this.handleLogout}
            />
          </Switch>
        </UserContext.Provider>
      </div>
    )
  }
}

export default AncestorComponent
export {UserContext}