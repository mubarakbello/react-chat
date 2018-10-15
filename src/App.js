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

/**
 * TODOS
 * 
 * 1. Complete firebase auth and redirect with appropraite routes
 * 2. Remove dummy codes
 * 3. Style pages
 */

export default App;
