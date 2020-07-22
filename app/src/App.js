import React, {Component} from 'react';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import Login from './Login';
import Redirect from "react-router-dom/Redirect";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import {BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <CookiesProvider>
          <Router>
            <Switch>
              {/*<Redirect from="/" to="/login" />*/}
              <Route path='/login' component={Login} />
              <Route component={Login} />
            </Switch>
          </Router>
        </CookiesProvider>
    )
  }
}

export default App;
