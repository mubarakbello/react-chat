import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'
import Loading from './Loading'


class SingleMessage extends Component {
  render() {
    const messageDetails = this.props.messageDetails
    return (
      <div
        id={messageDetails.last && 'last'}
        className={messageDetails.owner === 'Me' ? 'outgoing-message' : 'incoming-message'}
      >
        <p style={{marginBottom: '0px'}}>{messageDetails.text}</p>
        <small
          style={messageDetails.owner === 'Me' ? {float: 'right', fontSize: 'x-small'}:{fontSize: 'x-small'}}
        >
          {new Date(messageDetails.timestamp).toUTCString()}
        </small>
      </div>
    )
  }
}


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

  componentDidUpdate = (prevprops, prevState) => {
    if (this.props !== prevprops) {
      if (this.userMessagesChangesRef) this.userMessagesChangesRef.off()
      if (this.friendMessagesChangesRef) this.friendMessagesChangesRef.off()
      this.setState({messages: [], loading: true})
      this.handleChanges()
    }
    if (!!document.getElementById('last')) {
      document.getElementById('last').scrollIntoView({block: 'end', behavior: 'instant'})
    }
  }
  

  componentWillUnmount() {
    this.userMessagesChangesRef.off()
    this.friendMessagesChangesRef.off()
  }

  render() {
    let MessagesToRender = ''
    if (!this.state.loading) {
      const tempMessages = [...this.state.messages]
      tempMessages[tempMessages.length-1] = {...tempMessages[tempMessages.length-1], last: true}
      MessagesToRender = tempMessages.map(eachMessage => (
        <SingleMessage key={eachMessage.timestamp} messageDetails={eachMessage} />
      ))
    }
    return this.state.loading
      ? <div className="Message-panel"><Loading size="medium" text="messages" /></div>
      : (
        <div className="Message-panel">
          {MessagesToRender}
        </div>
      )
  }
}

export default MessagePanel