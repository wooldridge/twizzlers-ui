import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import Detail from './pages/Detail';
import Header from './components/Header/Header';
import { configHeader } from "./config/header.js";
import { getSearchResults } from './api/search';
import './App.scss';

type Props = {};

const App: React.FC<Props> = (props) => {

  const [searchOptions, setSearchOptions] = useState<any>({});
  const [searchResults, setSearchResults] = useState<any>({});

  useEffect(() => {
    setSearchResults(getSearchResults({}));
  }, [searchOptions]);

  const handleSearch = (opts) => {
    console.log("App handleSearch", opts);
    setSearchOptions(opts);
  }

  return (
    <div>
      <Router>
        <Header config={configHeader} handleSearch={handleSearch} />
        <main>
          <Switch>
            <Route path="/search">
              <Results searchResults={searchResults} />
            </Route>
            <Route path="/detail">
              <Detail />
            </Route>
            <Route path="/">
              <Dashboard handleSearch={handleSearch} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );

}

export default App;
