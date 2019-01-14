import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import PropTypes from 'prop-types'
import Loading from './Loading'

class UserDetailsOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      active: '',
      username: ''
    }
  }

  static propTypes = {
    user: PropTypes.object,
    friendId: PropTypes.string
  }

  noticeChanges = () => {
    this.friendStatusChangesRef = firebase.database().ref(`/users/${this.props.friendId}/profile-details`)
    this.friendStatusChangesRef.on('value', (snapshot) => {
      this.parseReceivedStatusDetails(snapshot.val())
    })
  }

  parseReceivedStatusDetails = ({active, username='Anonymous'}) => {
    this.setState({
      loading: false,
      active,
      username
    })
  }

  componentDidMount() {
    this.noticeChanges()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props !== prevProps) {
      if (this.friendStatusChangesRef) this.friendStatusChangesRef.off()
      this.setState({
        loading: true,
        active: '',
        username: ''
      })
      this.noticeChanges()
    }
  }

  componentWillReceiveprops(nextprops) {}

  componentWillUnmount() {
    if (this.friendStatusChangesRef) this.friendStatusChangesRef.off()
  }

  render() {
    return this.state.loading
      ? <div className="User-details-overview"><Loading size="small" text="follower status" /></div>
      : (
      <div className="User-details-overview">
        <h3>{this.state.username}</h3>
        <p>{this.state.active ? 'Online' : 'Offline'}</p>
      </div>
    )
  }
}

export default UserDetailsOverview