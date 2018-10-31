import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class TimelinePost extends Component {
  static propTypes = {
    postData: PropTypes.object
  }

  render() {
    return (
      <div className="Timeline-post">
        <Link to="#">
          <p>{this.props.postData.text}</p>
          {
            this.props.postData.timestamp !== 1
            && <small>Posted on: {new Date(this.props.postData.timestamp).toUTCString()}</small>
          }
        </Link>
      </div>
    )
  }
}

export default TimelinePost