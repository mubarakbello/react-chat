import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CreateTimelinePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  static propTypes = {
    addNewTimelinePost: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // do what your name implies!!!!!!!
    const value = this.state.value
    if (value !== '') {
      this.setState({
        value: ''
      })
      this.props.addNewTimelinePost(value)
    }
  }

  render() {
    return (
      <div className="Create-timeline-post">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              required
              value={this.state.value}
              placeholder="Post to your timeline..."
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>
    );
  }
}

export default CreateTimelinePost