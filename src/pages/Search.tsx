import React from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import Snippet from '../components/Snippet/Snippet';
import styles from './Search.module.scss';
import { configSearch } from "../config/search.js";

type Props = {
  searchResults: any;
};

const Search: React.FC<Props> = (props) => {

  return (
    <div className={styles.searchResults}>

      <aside className={styles.sidebar}>
        <Sidebar />   
      </aside>

      <div className={styles.results}> 
        <Snippet data={props.searchResults} config={configSearch} />
      </div>

    </div>
  );
}

export default Search;
