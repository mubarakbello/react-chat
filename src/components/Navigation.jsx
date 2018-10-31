import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation d-flex flex-column">
        <nav>
          <ul>
            <li><NavLink to="/">Timeline</NavLink></li>
            <li><NavLink to="/messages">Messages</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/followers">Followers</NavLink></li>
          </ul>
        </nav>
        <div>
          <button
            onClick={this.props.handleLogout}
            className="btn btn-danger"
          >Log out</button>
        </div>
      </div>
    )
  }
}

export default Navigation