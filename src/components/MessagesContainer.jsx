import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import RecentMessages from './RecentMessages'
import MessageView from './MessageView'
import {UserContext} from './AncestorComponent'

class MessagesContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/messages" component={RecentMessages} />
          <Route exact path="/messages/:friend_id" render={props => (
            <UserContext.Consumer>
              {value => (
                <MessageView user={value} friendId={props.match.params.friend_id} />
              )}
            </UserContext.Consumer>
          )} />
        </Switch>
      </div>
    )
  }
}

export default MessagesContainer