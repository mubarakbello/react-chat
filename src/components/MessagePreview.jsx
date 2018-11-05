import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class MessagePreview extends Component {
  static propTypes = {
    message: PropTypes.object
  }

  render() {
    const message = this.props.message
    return (
      <div className="Message-preview">
        <Link to={`/messages/${message.uid}`}>
          <div>
            <p>{message.username[0]}</p>
          </div>
          <div>
            <p>{message.s === 'y' ? `You to ${message.username}` : `${message.username} to You`}</p>
          </div>
          <div>
            <p>{message.text}</p>
          </div>
          <div>
            <small>Sent: {new Date(message.timestamp).toUTCString()}</small>
          </div>
        </Link>
      </div>
    )
  }
}

export default MessagePreview