import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchProvider from "./store/SearchContext";
import DetailProvider from "./store/DetailContext";
import Dashboard from "./views/Dashboard";
import Detail from "./views/Detail";
import Search from "./views/Search";
import Header from "./components/Header/Header";
import "./App.scss";

type Props = {};

const App: React.FC<Props> = (props) => {

  return (
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
  );

};

export default App;
