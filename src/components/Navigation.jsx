import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><NavLink to="/">Timeline</NavLink></li>
            <li><NavLink to="/messages">Messages</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/followers">Followers</NavLink></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Navigation