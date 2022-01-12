import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ResultsList from "../components/ResultsList/ResultsList";
import SelectedFacets from "../components/SelectedFacets/SelectedFacets";
import styles from "./Search.module.scss";
import {configSearch} from "../config/search.js";
import _ from "lodash";

type Props = {};

const Search: React.FC<Props> = (props) => {

  return (
    <div className={styles.search}>
      <aside className={styles.sidebar}>
        <Sidebar config={configSearch.sidebar} />
      </aside>
      <div className={styles.snippet}>
        <SelectedFacets />
        <ResultsList config={configSearch.results} />
      </div>
    </div>
  );
};

export default Search;
