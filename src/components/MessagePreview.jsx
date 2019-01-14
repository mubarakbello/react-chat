import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import girl from '../assets/thumbnails/girl.svg'
import man from '../assets/thumbnails/man.svg'
import girl1 from '../assets/thumbnails/girl1.svg'
import woman from '../assets/thumbnails/woman.svg'
import boy from '../assets/thumbnails/boy.svg'
import student from '../assets/thumbnails/student.svg'

const thumbnails = [girl, girl1, boy, man, woman, student]

class MessagePreview extends Component {
  static propTypes = {
    message: PropTypes.object
  }

  render() {
    const message = this.props.message
    const choice = Number((Math.random() * 5).toFixed(0))
    return (
      <div className="Message-preview">
        <Link to={`/messages/${message.uid}`}>
          <div className="preview-thumbnail">
            <img src={thumbnails[choice]} alt="thumbnail" width="50" height="50" />
          </div>
          <div className="preview-content">
            <div className="preview-username">
              <p>{message.s === 'y' ? `You to ${message.username}` : `${message.username} to You`}</p>
            </div>
            <div className="preview-text">
              <p>{message.text}</p>
            </div>
            <div className="preview-date">
              <small>Sent: {new Date(message.timestamp).toUTCString()}</small>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default MessagePreview