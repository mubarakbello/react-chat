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
    // eslint-disable-next-line
    const user = this.props.user
    this.friendStatusChangesRef = firebase.database().ref(`/users/${this.props.friendId}/profile-details`)
    this.friendStatusChangesRef.on('value', (snapshot) => {
      this.parseReceivedStatusDetails(snapshot.val() || {})
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

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {
    this.friendStatusChangesRef.off()
  }

  render() {
    return this.state.loading
      ? <Loading text="User Details" />
      : (
      <div className="User-details-overview">
        <h3>{this.state.username}</h3>
        <p>Currently {this.state.active ? 'online' : 'offline'}</p>
      </div>
    )
  }
}

export default UserDetailsOverview