import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import Loading from './Loading'

class ActiveFollowers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
  }

  getActiveFollowersFromDb =() => {
    this.followersListChangesRef = firebase.database().ref(`/users/${user.uid}/followers`)
    this.followersListChangesRef.on('value', (snapshot) => {
      this.formatActiveFollowersObject(snapshot.val() || {})
    })
  }

  formatActiveFollowersObject = (snapshot) => {
    let ActiveFollowersArray = []
    if (snapshot !== {} && snapshot !== null) {
      ActiveFollowersArray = Object.keys(snapshot).map(FollowerIndex => (
        snapshot[FollowerIndex]
      ))
    }
    this.setState(() => ({
      loading: false,
      users: ActiveFollowersArray
    }))
  }

  componentDidMount() {
    this.getActiveFollowersFromDb()
  }

  componentWillUnmount() {
    if (this.followersListChangesRef) this.followersListChangesRef.off()
  }

  render() {
    let FollowersListToRender = 'No followers yet'
    if (!this.state.loading) {
      if (this.state.users.length !== 0) {
        FollowersListToRender = this.state.users.map(eachFollower => (
          <Link
            key={eachFollower.uid}
            to={`/messages/${eachFollower.uid}`}
          >
            {eachFollower.username}
          </Link>
        ))
      }
    }
    return this.state.loading
      ? <Loading text="Active followers" />
      : (
      <div className="Active-followers">
        <div className="recent-messages">
          <Link to="/messages">Recent Messages</Link>
        </div>
        <div className="online">
          {/* <Link to="/messages/QLrJlaTXtYPT9LKTKTPdzqoHxJv2">Mubarak</Link>
          <Link to="/messages/BD9lHL0fYnPCIfMqUmWuwRU9Sf73">Divine</Link>
          <Link to="/messages/reazM4601zT4ZfpliFnKhsvpvEC2">Elseagle</Link>
          <Link to="/messages/user4">User ade 4</Link> */}
          {FollowersListToRender}
        </div>
      </div>
    )
  }
}

export default ActiveFollowers