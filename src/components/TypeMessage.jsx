import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TypeMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  static propTypes = {
    handleMessageSending: PropTypes.func
  }

  handleChange = (e) => {
    // hanlde changes
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // handle submit
    if (this.state.message !== '') {
      this.props.handleMessageSending(this.state.message)
      this.setState({message: ''})
    }
  }

  render() {
    return (
      <div className="Type-message">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TypeMessage