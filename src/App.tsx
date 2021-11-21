import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchProvider from "./store/SearchContext";
import Dashboard from "./views/Dashboard";
import Detail from "./views/Detail";
import Results from "./views/Results";
import Header from "./components/Header/Header";
import "./App.scss";

type Props = {};

const App: React.FC<Props> = (props) => {

  return (
    <SearchProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Results />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </main>
    </SearchProvider>
  );

};

export default App;
