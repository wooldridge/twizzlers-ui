import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./store/UserContext";
import SearchProvider from "./store/SearchContext";
import DetailProvider from "./store/DetailContext";
import ErrorHandler from "./store/ErrorHandler";
import Dashboard from "./views/Dashboard";
import Detail from "./views/Detail";
import Search from "./views/Search";
import Header from "./views/Header";
import "./App.scss";

type Props = {};

const App: React.FC<Props> = (props) => {

  const userContext = useContext(UserContext);

  if (!userContext.userid) {
    console.log("App handleLogin", userContext.userid);
    userContext.handleLogin();
  }

  return (
    <Router>
      <ErrorHandler>
        <SearchProvider>
          <DetailProvider>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="/detail/:id" element={<Detail />} />
              </Routes>
            </main>
          </DetailProvider>
        </SearchProvider>
      </ErrorHandler>
    </Router>
  );

};

export default App;
