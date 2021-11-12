import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './views/Dashboard';
import Detail from './views/Detail';
import Results from './views/Results';
import Header from './components/Header/Header';
import SearchContext from "./store/search-context";
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
    <SearchContext.Provider value={{
      handleSearch: handleSearch,
      searchResults: searchResults
    }}>
      <div>
        <Router>
          <Header />
          <main>
            <Switch>
              <Route path="/search">
                <Results />
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
    </SearchContext.Provider>
  );

}

export default App;
