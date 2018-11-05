import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation">
        <div>
          <nav>
            <NavLink to="/">Timeline</NavLink>
            <NavLink to="/messages">Messages</NavLink>
            <NavLink to="/followers">Followers</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
        </div>
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