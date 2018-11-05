import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SingleFollower extends Component {
  static propTypes = {
    that_user: PropTypes.object,
    button_text: PropTypes.string,
    button_class: PropTypes.string,
    handleButtonClick: PropTypes.func
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.props.that_user.username}</p>
        </div>
        <div>
          <button
            onClick={() => this.props.handleButtonClick(this.props.that_user)}
            className={`btn btn-${this.props.button_class}`}
          >
            {this.props.button_text}
          </button>
        </div>
      </div>
    )
  }
}

export default SingleFollower