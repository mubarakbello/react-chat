import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ActiveFollowers extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/messages">Recent Messages</Link>
        </div>
        <div>
          <Link to="/messages/QLrJlaTXtYPT9LKTKTPdzqoHxJv2">Mubarak</Link>
          <Link to="/messages/BD9lHL0fYnPCIfMqUmWuwRU9Sf73">Divine</Link>
          <Link to="/messages/reazM4601zT4ZfpliFnKhsvpvEC2">Elseagle</Link>
          <Link to="/messages/user4">User ade 4</Link>
        </div>
      </div>
    )
  }
}

export default ActiveFollowers