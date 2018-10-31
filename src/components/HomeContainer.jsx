import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import Navigation from './Navigation'
import FollowersPage from './FollowersPage'
import MessagesPage from './MessagesPage'
import ProfilePage from './ProfilePage'
import Timeline from './Timeline'

class HomeContainer extends Component {
  static propTypes = {
    handleLogout: PropTypes.func
  }

  render() {
    return (
      <div className="Home-container">
        <Navigation handleLogout={this.props.handleLogout}/>
        <Switch>
          <Route exact path="/" component={Timeline} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/followers" component={FollowersPage} />
          <Route path="/messages" component={MessagesPage} />
          <Route render={() => <div>No match</div>} />
        </Switch>
      </div>
    )
  }
}

const Footer = () => (
  <div className="Footer">
    <span>Copyright 2018</span>
  </div>
)

export default HomeContainer