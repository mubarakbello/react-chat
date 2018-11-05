import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/database'
import MessagePreview from './MessagePreview'
import Loading from './Loading'

class RecentMessages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: {}
    }
  }

  static propTypes = {
    user: PropTypes.object
  }

  getRecentMessagesFromDb = () => {
    const user = this.props.user
    this.recentMessagesChangesRef = firebase.database().ref(`/users/${user.uid}/recent-messages`)
    this.recentMessagesChangesRef.on('value', (snapshot) => {
      this.formatRecentMessagesObject(snapshot.val() || {})
    })
  }

  formatRecentMessagesObject = (snapshot) => {
    const snapshotKeys = Object.keys(snapshot)
    for(let key of snapshotKeys) {
      firebase.database().ref(`/users/${key}/profile-details/username`).once('value')
        .then(Snapshot => {
          this.setState({
            list: {...this.state.list, [key]: Snapshot.val()}
          })
        })
    }
    let RecentMessagesArray = []
    if (snapshot !== {} && snapshot !== null) {
      RecentMessagesArray = snapshotKeys.map(MessageIndex => ({
        ...snapshot[MessageIndex],
        uid: MessageIndex,
      }))
    }
    RecentMessagesArray = RecentMessagesArray.sort((a, b) => (a.timestamp - b.timestamp))
    this.setState(() => ({
      loading: false,
      recentMessages: RecentMessagesArray.reverse()
    }))
  }

  componentDidMount() {
    this.getRecentMessagesFromDb()
  }

  componentWillUnmount() {
    if (this.recentMessagesChangesRef) this.recentMessagesChangesRef.off()
  }

  render() {
    let MessagesArrayWithUsername = []
    if (!this.state.loading) {
      MessagesArrayWithUsername = this.state.recentMessages.map(Message => ({
        ...Message,
        username: this.state.list[Message.uid] || '',
      }))
    }
    let MessagePreviews = ''
    if (!this.state.loading) {
      MessagePreviews = MessagesArrayWithUsername.map(recentMessage => (
        <MessagePreview key={recentMessage.timestamp} message={recentMessage} />
      ))
    }
    return this.state.loading
      ? <Loading text="Message Previews" />
      : (
        <div className="Recent-messages">
          {MessagePreviews}
        </div>
      )
  }
}

export default RecentMessages