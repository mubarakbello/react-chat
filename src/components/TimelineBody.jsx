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
      timelinePostData: []
    }
  }

  static propTypes = {
    user: PropTypes.object
  }

  parseReceivedPosts = (timelinePostsSnapshot) => {
    let PostsObject
    if (timelinePostsSnapshot !== {} && timelinePostsSnapshot !== null) {
      PostsObject = Object.keys(timelinePostsSnapshot).map(postIndex => (
        timelinePostsSnapshot[postIndex]
      ))
    } else {
      PostsObject = [{
        text: 'No timeline posts available. Try posting one now!',
        timestamp: 1
      }]
    }
    this.setState(() => ({
      timelinePostData: PostsObject.reverse(),
      loading: false
    }))
  }

  componentDidMount() {
    const user = this.props.user
    this.timelinePostsChangesRef = firebase.database().ref(`/users/${user.uid}/timeline-posts`)
    this.timelinePostsChangesRef.on('value', (snapshot) => {
      this.parseReceivedPosts(snapshot.val() || {})
    })
  }

  componentWillUnmount() {
    this.timelinePostsChangesRef.off()
  }

  render() {
    const TimelinePosts = this.state.timelinePostData.map(timelinePost => (
      <TimelinePost key={timelinePost.timestamp} postData={timelinePost} />
    ))
    return this.state.loading
      ? <Loading />
      : (
        <div>
          {TimelinePosts}
        </div>
      )
  }
}

export default TimelineBody