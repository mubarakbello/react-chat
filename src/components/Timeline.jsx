import React, {Component} from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import {UserContext} from './AncestorComponent'
import CreateTimelinePost from './CreateTimelinePost'
import TimelineBody from './TimelineBody'

class Timeline extends Component {
  addNewTimelinePost = (text) => {
    const postData = {
      timestamp: Date.now(),
      text
    }
    const posts_hook = `users/${this.user.uid}/timeline-posts`
    const newPostKey = firebase.database().ref().child(posts_hook).push().key
    let updates = {}
    updates[`/${posts_hook}/${newPostKey}`] = postData
    firebase.database().ref().update(updates)
      .then(res => {
        // console.log('Done')
        // pass
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.user = firebase.auth().currentUser
  }

  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <div className="Timeline">
            <div className="timeline-greeting">
              <span>Hi {user.username} !!!</span>
            </div>
            <CreateTimelinePost
              addNewTimelinePost={this.addNewTimelinePost}
            />
            <TimelineBody user={user} />
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default Timeline