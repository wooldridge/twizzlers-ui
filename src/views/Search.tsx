import React from "react";
import SummaryMeter from "../components/SummaryMeter/SummaryMeter";
import Facets from "../components/Facets/Facets";
import ResultsList from "../components/ResultsList/ResultsList";
import SelectedFacets from "../components/SelectedFacets/SelectedFacets";
import styles from "./Search.module.scss";
import {configSearch} from "../config/search.js";
import _ from "lodash";

type Props = {};

const Search: React.FC<Props> = (props) => {

  return (
    <div className={styles.search}>
      <aside>
        <SummaryMeter config={configSearch.meter} />
        <Facets config={configSearch.facets} />
      </aside>
      <div className={styles.results}>
        <SelectedFacets />
        <ResultsList config={configSearch.results} />
      </div>
    </div>
  );
};

export default Search;
