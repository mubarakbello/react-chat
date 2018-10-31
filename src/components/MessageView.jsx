import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'
import UserDetailsOverview from './UserDetailsOverview'
import MessagePanel from './MessagePanel'
import TypeMessage from './TypeMessage'

class MessageView extends Component {
  static propTypes = {
    friendId: PropTypes.string,
    user: PropTypes.object
  }

  handleMessageSending = (text) => {
    const messageData = {
      timestamp: Date.now(),
      text
    }
    const messages_hook = `users/${this.props.user.uid}/messages/${this.props.friendId}`
    const newMessageKey = firebase.database().ref().child(messages_hook).push().key
    let updates = {}
    updates[`/${messages_hook}/${newMessageKey}`] = messageData
    firebase.database().ref().update(updates)
      .then(res => {
        console.log('Done')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="Message-view">
        <UserDetailsOverview friendId={this.props.friendId} />
        <MessagePanel
          user={this.props.user}
          friendId={this.props.friendId}
        />
        <TypeMessage
          handleMessageSending={this.handleMessageSending}
        />
      </div>
    )
  }
}

export default MessageView