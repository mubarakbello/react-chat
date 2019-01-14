import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'
import Loading from './Loading'
import TimelinePost from './TimelinePost'

class TimelineBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      timelinePostData: {}
    }
  }

  static propTypes = {
    user: PropTypes.object
  }

  parseReceivedList = (followersListSnapshot) => {
    let followersIdList = []
    if (followersListSnapshot !== {} && followersListSnapshot !== null) {
      followersIdList = Object.keys(followersListSnapshot).map(postIndex => (
        followersListSnapshot[postIndex]
      ))
    }
    followersIdList.push({
      uid: this.props.user.uid,
      username: 'Posted by you'
    })
    // get timeline posts for each user in d list
    // and set refs on them for changes
    // store each
    this.followersTimelinePostsRef = []
    for(let followerId of followersIdList) {
      const followerRef = firebase.database().ref(`/users/${followerId.uid}/timeline-posts`)
      this.followersTimelinePostsRef.push(followerRef)
      followerRef.on('value', snapshot => {
        this.parseReceivedPosts(followerId, snapshot.val())
      })
    }
  }

  parseReceivedPosts = ({uid, username}, snapshot) => {
    if (snapshot !== null) {
      // parse the posts into an array of objects and add username entry to each post
      snapshot = Object.keys(snapshot).map(e => ({...snapshot[e], username}))
      // create deep copy of state.timelinePostData
      const nextState = {...this.state.timelinePostData}
      // update or create as necessary
      nextState[uid] = snapshot
      //update state
      this.setState(() => ({
        timelinePostData: nextState,
        loading: false
      }))
    }
  }

  componentDidMount() {
    const user = this.props.user
    this.followersListChangesRef = firebase.database().ref(`/users/${user.uid}/followers`)
    this.followersListChangesRef.on('value', (snapshot) => {
      this.parseReceivedList(snapshot.val() || {})
    })
  }

  componentWillUnmount() {
    if (this.followersListChangesRef) {
      this.followersListChangesRef.off()
      for(let followerRef of this.followersTimelinePostsRef) {
        followerRef.off()
      }
    }
  }

  render() {
    let Posts = []
    const dataKeys = Object.keys(this.state.timelinePostData)
    for (const uid of dataKeys) {
      Posts = [...Posts, ...this.state.timelinePostData[uid]]
    }
    Posts = Posts.sort((a, b) => a.timestamp - b.timestamp)
    const TimelinePosts = Posts.reverse().map(Post => (
      <TimelinePost key={Post.timestamp} postData={Post} />
    ))
    return this.state.loading
      ? <Loading size="medium" />
      : (
        <div className="Timeline-body">
          {TimelinePosts}
        </div>
      )
  }
}

export default TimelineBody