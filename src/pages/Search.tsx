import React from 'react';
import {Link} from "react-router-dom";
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './Search.module.scss';

type Props = {};

const Search: React.FC<Props> = (props) => {
  return (
    <div>
      <aside>
        <Sidebar />   
      </aside>
      <div className={styles.results}> 
        <h1>Search Page</h1>
        <p><Link to="/detail">Detail Page Link</Link></p>
      </div>
    </div>
  );
}

export default Search;
