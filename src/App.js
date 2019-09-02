import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'react-notifications/lib/notifications.css';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Home from "./components/home.component";
import Detail from "./components/detail.component";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">Summerinternship</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to={'/create'} className="nav-link">Create</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/index'} className="nav-link">Index</Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <br/>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/index' component={Index}/>
                <Route path='/create' component={Create}/>
                <Route path='/edit/:id' component={Edit}/>
                <Route path='/category/:slug' component={Detail}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
