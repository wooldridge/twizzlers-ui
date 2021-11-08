import React, {useState, useEffect} from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import SearchResults from '../components/SearchResults/SearchResults';
import { getSearchResults } from '../api/search';
import styles from './Search.module.scss';
import { configSearch } from "../config/search.js";

type Props = {};

const Search: React.FC<Props> = (props) => {

  const [searchResults, setSearchResults] = useState<any>({});

  useEffect(() => {
    setSearchResults(getSearchResults({}));
  }, []);

  return (
    <div>
      <aside>
        <Sidebar />   
      </aside>
      <div className={styles.results}> 
        <SearchResults data={searchResults} config={configSearch} />
      </div>
    </div>
  );
}

export default Search;
