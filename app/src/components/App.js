import React, {Component} from 'react';
import '../App.css';
import { CookiesProvider } from 'react-cookie';
import Login from './Login';
import Todos from './Todos';
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import {BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <CookiesProvider>
          <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path='/login' exact component={Login} />
                <Route path='/todos' exact component={Todos} />
            </Switch>
          </Router>
        </CookiesProvider>
    )
  }
}

export default App;
