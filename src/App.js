import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AncestorComponent from './components/AncestorComponent'

class App extends Component {
  render() {
    return (
      <Router>
        <AncestorComponent />
      </Router>
    );
  }
}

export default App;
