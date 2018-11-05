import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import RecentMessages from './RecentMessages'
import MessageView from './MessageView'

class MessagesContainer extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const user = this.props.user
    return (
      <div className="Messages-container">
        <Switch>
          <Route exact path="/messages" render={props => (
            <RecentMessages user={user} {...props} />
          )} />
          <Route exact path="/messages/:friend_id" render={props => (
            <MessageView user={user} friendId={props.match.params.friend_id} />
          )} />
        </Switch>
      </div>
    )
  }
}

export default MessagesContainer