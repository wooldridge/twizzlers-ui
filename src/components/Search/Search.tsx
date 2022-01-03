import React from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Saved from "../../components/Saved/Saved";
import {configSearchbox} from "../../config/searchbox.js";
import styles from "./Search.module.scss";

type Props = {
  data?: any;
  config?: any;
};

/**
 * Component for showing dashboard search interface.
 *
 * @component
 * @prop {object} data - Data payload.
 * @prop {object[]} config  Array of configuration objects.
 * @example
 * TBD
 */
const Search: React.FC<Props> = (props) => {

  return (
    <div className="search">
      <div className={styles.newSearch}>
        <h4>New Search</h4>
        <SearchBox config={configSearchbox} button="vertical" width="100%" />
      </div>
      <div className={styles.divider}>- or -</div>
      <div className={styles.savedSearches}>
        <h4>Saved Searches</h4>
        <Saved data={props.data} config={props.config.saved} />
      </div>
    </div>
  );
};

export default Search;
