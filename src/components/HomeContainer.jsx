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
      <div>
        <Navigation />
        <div>
          <button
            onClick={this.props.handleLogout}
            className="btn btn-danger"
          >Log out</button>
        </div>
        <Switch>
          <Route exact path="/" component={Timeline} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/followers" component={FollowersPage} />
          <Route path="/messages" component={MessagesPage} />
        </Switch>
        <Footer />
      </div>
    )
  }
}

const Footer = () => (
  <div className="footer">
    <span>&lt;Ehmbeey /&gt; </span>
    <span>Copyright 2018</span>
  </div>
)

export default HomeContainer