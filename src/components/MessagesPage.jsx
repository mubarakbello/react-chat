import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ActiveFollowers from './ActiveFollowers'
import MessagesContainer from './MessagesContainer'
import {UserContext} from './AncestorComponent'

class MessagesPageWrapper extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <MessagesPage user={user} />
        )}
      </UserContext.Consumer>
    )
  }
}

class MessagesPage extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const user = this.props.user
    return (
      <div className="Messages-page">
        <ActiveFollowers user={user} />
        <MessagesContainer user={user} />
      </div>
    );
  }
}

export default MessagesPageWrapper
