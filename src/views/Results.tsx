import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Snippet from "../components/Snippet/Snippet";
import styles from "./Results.module.scss";
import {configResults} from "../config/results.js";

type Props = {};

const Results: React.FC<Props> = (props) => {

  return (
    <div className={styles.results}>

      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <div className={styles.snippet}>
        <Snippet config={configResults.snippet} />
      </div>

    </div>
  );
};

export default Results;
