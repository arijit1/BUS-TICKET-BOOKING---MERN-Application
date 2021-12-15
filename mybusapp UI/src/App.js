import React from 'react';
import './App.css';
import { Start, PlanTravel } from './services/services_index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Start />} />
          <Route path="/login" render={() => <Start />} />
          <Route path="/planTravel" render={() => <PlanTravel />} />
          <Route path="/bus-seats" render={() => <PlanTravel />} />
          <Route path="/payment" render={() => <PlanTravel />} />
          <Route path="/confirmation" render={() => <PlanTravel />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
