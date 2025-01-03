import React, { useEffect } from 'react';
import { Logger } from './framework/logging';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HelloWorld from 'example/components/pages/HelloWorld';
import Todo from 'example/components/pages/Todo';
import './App.css';
import { BackendService } from 'example/backend';

const App = () => {
  Logger.debug('rendering App...');

  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    BackendService.refreshCsrfToken()
      .finally(() => setInitialized(true));
  }, []);

  if(!initialized){
    return (
      <React.Fragment></React.Fragment>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>Topページ</div>
        </Route>
        <Route exact path="/todo">
          <Todo></Todo>
        </Route>
        <Route exact path="/hello">
          <HelloWorld></HelloWorld>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
