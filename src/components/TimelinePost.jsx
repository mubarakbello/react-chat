import React, {Component} from 'react'
import girl from '../assets/thumbnails/girl.svg'
import man from '../assets/thumbnails/man.svg'
import girl1 from '../assets/thumbnails/girl1.svg'
import woman from '../assets/thumbnails/woman.svg'
import boy from '../assets/thumbnails/boy.svg'
import student from '../assets/thumbnails/student.svg'
import PropTypes from 'prop-types'

const thumbnails = [girl, girl1, boy, man, woman, student]

class TimelinePost extends Component {
  static propTypes = {
    postData: PropTypes.object
  }

  render() {
    const choice = Number((Math.random() * 5).toFixed(0))
    return (
      <div className="Timeline-post">
        <div className="timeline-thumbnail">
          <img src={thumbnails[choice]} alt="thumbnail" width="50" height="50" />
        </div>
        <div className="timeline-content">
          <div className="timeline-username">
            <p>{this.props.postData.username}</p>
          </div>
          <div className="timeline-text">
            <p>{this.props.postData.text}</p>
          </div>
          <div className="timeline-date">
            <small>Posted on: {new Date(this.props.postData.timestamp).toUTCString()}</small>
          </div>
        </div>
      </div>
    )
  }
}

export default TimelinePost