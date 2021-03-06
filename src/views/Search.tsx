import React, { useContext } from "react";
import { SearchContext } from "../store/SearchContext";
import Sidebar from "../components/Sidebar/Sidebar";
import Snippet from "../components/Snippet/Snippet";
import SelectedFacets from "../components/SelectedFacets/SelectedFacets";
import styles from "./Search.module.scss";
import {configResults} from "../config/results.js";
import _ from "lodash";

type Props = {};

const Search: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);
  if (_.isEmpty(searchContext.searchResults)) {
    searchContext.handleSearch(searchContext.qtext);
  }

  return (
    <div className={styles.search}>
      <aside className={styles.sidebar}>
        <Sidebar config={configResults.sidebar} />
      </aside>
      <div className={styles.snippet}>
        <SelectedFacets />
        <Snippet config={configResults.snippet} />
      </div>
    </div>
  );
};

export default Search;
