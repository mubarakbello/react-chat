import React, { Component } from 'react';
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/database'
import {UserContext} from './AncestorComponent'
import Loading from './Loading'
import SingleFollower from './SingleFollower'

class FollowersPageWrapper extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <FollowersPage user={user}/>
        )}
      </UserContext.Consumer>
    )
  }
}

class FollowersPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      followers: [],
      other_users: []
    }
  }

  static propTypes = {
    user: PropTypes.object
  }

  getUsersFromDb = () => {
    this.usersListChangesRef = firebase.database().ref(`/users-list`)
    this.usersListChangesRef.on('value', (snapshot) => {
      this.formatUsersObject(snapshot.val() || {})
    })
  }

  formatUsersObject = (snapshot) => {
    let UsersArray = []
    // parse snapshot into array of objects
    if (snapshot !== {} && snapshot !== null) {
      UsersArray = Object.keys(snapshot).map(UserIndex => (
        snapshot[UserIndex]
      ))
    }
    let self = this
    // remove self from other users array
    const OtherUsersArray = UsersArray.filter(nonFollower => (
      nonFollower.uid !== self.props.user.uid
    ))
    // update state
    this.setState(() => ({
      loading: false,
      other_users: OtherUsersArray
    }))
  }

  getActiveFollowersFromDb = () => {
    const user = this.props.user
    this.followersListChangesRef = firebase.database().ref(`/users/${user.uid}/followers`)
    this.followersListChangesRef.on('value', (snapshot) => {
      this.formatActiveFollowersObject(snapshot.val() || {})
    })
  }

  formatActiveFollowersObject = (snapshot) => {
    let ActiveFollowersArray = []
    // parse snapshot into array of objects
    if (snapshot !== {} && snapshot !== null) {
      ActiveFollowersArray = Object.keys(snapshot).map(FollowerIndex => (
        snapshot[FollowerIndex]
      ))
    }
    // update state
    this.setState(() => ({
      loading: false,
      followers: ActiveFollowersArray
    }))
  }

  handleFollow = ({uid, username}) => {
    firebase.database().ref(`users/${this.props.user.uid}/followers/${uid}`).set({
      uid,
      username
    })
    firebase.database().ref(`users/${uid}/followers/${this.props.user.uid}`).set({
      uid: this.props.user.uid,
      username: this.props.user.username
    })
  }

  handleUnfollow = ({uid}) => {
    // unfollow uid from user
    firebase.database().ref(`users/${this.props.user.uid}/followers/${uid}`).remove()
      .then(() => {
        console.log('Done unfollowing')
      })
  }

  componentDidMount() {
    this.getActiveFollowersFromDb()
    this.getUsersFromDb()
  }

  componentWillUnmount() {
    if (this.usersListChangesRef) this.usersListChangesRef.off()
    if (this.followersListChangesRef) this.followersListChangesRef.off()
  }

  render() {
    let FollowersList = "No followers yet", NonFollowersList = "No more users to add"
    let self = this
    if (!this.state.loading) {
      if (this.state.followers.length !== 0) {
        FollowersList = this.state.followers.map(eachFollower => (
          <SingleFollower
            key={eachFollower.uid}
            that_user={eachFollower}
            button_text="Unfollow"
            button_class="warning"
            handleButtonClick={this.handleUnfollow}
          />
        ))
      }
      if (this.state.other_users.length !== 0) {
        // remove followers from other users array
        const NonFollowersArray = this.state.other_users.filter(function(i){
          return !self.state.followers.some(function(j){
              return !Object.keys(j).some(function(prop){
                  return i[prop] !== j[prop]
              })
          })
        })
        if (NonFollowersArray.length !== 0) {
          NonFollowersList = NonFollowersArray.map(eachNonFollower => (
            <SingleFollower
              key={eachNonFollower.uid}
              that_user={eachNonFollower}
              button_text="Follow"
              button_class="primary"
              handleButtonClick={this.handleFollow}
            />
          ))
        }
      }
    }
    return this.state.loading
      ? <Loading text="Followers" />
      : (
        <div className="Followers-page">
          <div>
            <div>Followers</div>
            <div>
              {FollowersList}
            </div>
          </div>
          <div>
            <div>Add followers</div>
            <div>
              {NonFollowersList}
            </div>
          </div>
        </div>
      );
  }
}

export default FollowersPageWrapper