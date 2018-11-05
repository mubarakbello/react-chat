import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import Navigation from './Navigation'
import FollowersPageWrapper from './FollowersPage'
import MessagesPageWrapper from './MessagesPage'
import ProfilePageWrapper from './ProfilePage'
import Timeline from './Timeline'

class HomeContainer extends Component {
  static propTypes = {
    handleLogout: PropTypes.func
  }

  render() {
    return (
      <div className="Home-container">
        <div className="container-header">
          <h2>Chat Application</h2>
        </div>
        <Navigation handleLogout={this.props.handleLogout}/>
        <Switch>
          <Route exact path="/" component={Timeline} />
          <Route exact path="/profile" component={ProfilePageWrapper} />
          <Route exact path="/followers" component={FollowersPageWrapper} />
          <Route path="/messages" component={MessagesPageWrapper} />
          <Route render={() => <div>No match</div>} />
        </Switch>
      </div>
    )
  }
}

// eslint-disable-next-line
const Footer = () => (
  <div className="Footer">
    <span>Copyright 2018</span>
  </div>
)

export default HomeContainer