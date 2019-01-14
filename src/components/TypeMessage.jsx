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
        <form onSubmit={this.handleSubmit} style={{display:'flex'}}>
          <div style={{width:'85%'}}>
            <input
              className="form-control"
              type="text"
              placeholder="Type a message..."
              autoFocus
              value={this.state.message}
              onChange={this.handleChange}
            />
          </div>
          <button style={{width:'15%'}} className="btn btn-primary" type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default TypeMessage