import React, { Component } from 'react'
// import MessagePreview from './MessagePreview'
import Loading from './Loading'

class RecentMessages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render() {
    return this.state.loading
      ? <Loading text="Message Previews" />
      : (
        <div className="Recent-messages">
          Message Preview Component
        </div>
      )
  }
}

export default RecentMessages