import React, { Component } from 'react'
import ActiveFollowers from './ActiveFollowers'
import MessagesContainer from './MessagesContainer'

class MessagesPage extends Component {
  render() {
    return (
      <div>
        <ActiveFollowers />
        <MessagesContainer />
      </div>
    );
  }
}

export default MessagesPage
