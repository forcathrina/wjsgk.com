import React, { Component } from 'react';
import Home from './AppHome';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TextList from './AppTextList';
import TextEdit from './AppTextEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/data' exact={true} component={TextList}/>
          <Route path='/data/:id' component={TextEdit}/>
          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    )
  }
}

export default App;