import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'
import Loading from './Loading'

const SingleMessage = (props) => (
  <div>
    <p>{props.messageDetails.owner} -- {props.messageDetails.text}</p>
    <small>{new Date(props.messageDetails.timestamp).toUTCString()}</small>
  </div>
)

class MessagePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      messages: []
    }
  }

  static propTypes = {
    user: PropTypes.object,
    friendId: PropTypes.string
  }

  uniqBy = (a, key) => {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
  }

  parseMessages = (messageSnapshot, uid) => {
    const newSnapshot = messageSnapshot.map(eachMessage => ({
      ...eachMessage,
      'owner' : uid === this.props.friendId ? 'Friend' : 'Me'
    }))
    let nextMessagesState =  this.uniqBy(this.state.messages.concat(newSnapshot), JSON.stringify).sort(function (a, b) {
      return a.timestamp - b.timestamp;
    })
    this.setState({
      loading: false,
      messages: nextMessagesState
    })
  }

  formatMessageObject = (snapshot) => {
    let MessagesArray = []
    if (snapshot !== {} && snapshot !== null) {
      MessagesArray = Object.keys(snapshot).map(messageIndex => (
        snapshot[messageIndex]
      ))
    }
    return MessagesArray
  }

  handleChanges = () => {
    const user = this.props.user
    const friendId = this.props.friendId
    this.userMessagesChangesRef = firebase.database().ref(`/users/${user.uid}/messages/${friendId}`)
    this.userMessagesChangesRef.on('value', (snapshot) => {
      this.parseMessages(this.formatMessageObject(snapshot.val() || {}), user.uid)
    })
    this.friendMessagesChangesRef = firebase.database().ref(`/users/${friendId}/messages/${user.uid}`)
    this.friendMessagesChangesRef.on('value', (snapshot) => {
      this.parseMessages(this.formatMessageObject(snapshot.val() || {}), friendId)
    })
  }

  componentDidMount() {
    // do something
    this.handleChanges()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      if (this.userMessagesChangesRef) this.userMessagesChangesRef.off()
      if (this.friendMessagesChangesRef) this.friendMessagesChangesRef.off()
      this.setState({messages: [], loading: true})
      this.handleChanges()
    }
  }
  

  componentWillUnmount() {
    this.userMessagesChangesRef.off()
    this.friendMessagesChangesRef.off()
  }

  render() {
    let MessagesToRender = ''
    if (!this.state.loading) {
      MessagesToRender = this.state.messages.map(eachMessage => (
        <SingleMessage key={eachMessage.timestamp} messageDetails={eachMessage} />
      ))
    }
    return this.state.loading
      ? <Loading text="Messages" />
      : (
        <div className="Message-panel">
          {MessagesToRender}
        </div>
      )
  }
}

export default MessagePanel