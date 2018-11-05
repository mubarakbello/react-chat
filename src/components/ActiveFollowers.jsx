import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'
import Loading from './Loading'

class ActiveFollowers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      followers: [],
      loading: true
    }
  }

  static propTypes = {
    user: PropTypes.object
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
    if (snapshot !== {} && snapshot !== null) {
      ActiveFollowersArray = Object.keys(snapshot).map(FollowerIndex => (
        snapshot[FollowerIndex]
      ))
    }
    this.setState(() => ({
      loading: false,
      followers: ActiveFollowersArray
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
      if (this.state.followers.length !== 0) {
        FollowersListToRender = this.state.followers.map(eachFollower => (
          <NavLink
            key={eachFollower.uid}
            to={`/messages/${eachFollower.uid}`}
          >
            {eachFollower.username}
          </NavLink>
        ))
      }
    }
    return this.state.loading
      ? <Loading text="Active followers" />
      : (
      <div className="Active-followers">
        <div className="recent-messages">
          <NavLink to="/messages">Recent Messages</NavLink>
        </div>
        <div className="online">
          {FollowersListToRender}
        </div>
      </div>
    )
  }
}

export default ActiveFollowers