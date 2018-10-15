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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea
              value={this.state.value}
              placeholder="Post to your timeline..."
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Post"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTimelinePost