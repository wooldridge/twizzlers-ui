import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Header from './components/Header/Header';
import './App.scss';

type Props = {};

const App: React.FC<Props> = (props) => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/detail">
              <Detail />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
