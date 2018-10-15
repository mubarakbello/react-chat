import React, { Component, createContext } from 'react'
// eslint-disable-next-line
import {Route, Switch} from 'react-router-dom'
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
        console.log(user)
        this.setState(() => ({
          authed: true,
          loading: false,
          user
        }))
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
    initializeFirebase()
    this.changeAuthState()
  }

  render() {
    return this.state.loading
      ? <Loading />
      : (
      <div className="app">
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
            {/* <Route myName="Mubarak" render={(props) => {
              console.log(props)
              return (<h3>No Match</h3>)
            }} /> */}
          </Switch>
        </UserContext.Provider>
      </div>
    )
  }
}

export default AncestorComponent
export {UserContext}