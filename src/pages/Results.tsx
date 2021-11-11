import React from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import Snippet from '../components/Snippet/Snippet';
import styles from './Results.module.scss';
import { configResults } from "../config/results.js";

type Props = {
  searchResults: any;
};

const Results: React.FC<Props> = (props) => {

  return (
    <div className={styles.results}>

      <aside className={styles.sidebar}>
        <Sidebar />   
      </aside>

      <div className={styles.snippet}> 
        <Snippet data={props.searchResults} config={configResults} />
      </div>

    </div>
  );
}

export default Results;
