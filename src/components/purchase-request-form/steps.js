import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Result from './result';

export default function Steps() {
  return (
    <Router>
      <Switch>
        <Route exact path="/step1" component={Step1} />
        <Route exact path="/step2" component={Step2} />
        <Route exact path="/step3" component={Step3} />
        <Route exact path="/result" component={Result} /> 
      </Switch>
    </Router>
  );
}
