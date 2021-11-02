import React from 'react';
import _ from 'lodash';
import styles from './SearchResults.module.scss';
import {Link} from "react-router-dom";

type Props = {
    searchResults: any;
    config?: any
};

const SearchResults: React.FC<Props> = (props) => {

  function display(key, res) {
    let val = _.get(res, key)
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val)
  }

  function getResults() {
    let snippet = props.config.search.snippet;
    let res = props.searchResults.results.map((res, index) => {
        let items = snippet.items.map((it, index) => {
          return (
            <div key={"item-" + index}>
              {display(it, res)}
            </div>
          )
        });
        return (
          <div key={"result-" + index} className={styles.result}>
            <div className={styles.thumbnail}>
              <img 
                src={display(snippet.thumbnail.src, res)} 
                alt={display(snippet.title, res)}
              ></img>
            </div>
            <div className={styles.text}>
              <div className={styles.title}>
                <Link to="/detail">{display(snippet.title, res)}</Link>
              </div>
              <div className={styles.subtitle}>
                <div className="address">
                  {display(snippet.address.street, res)},&nbsp;
                  {display(snippet.address.city, res)},&nbsp;
                  {display(snippet.address.state, res)}&nbsp;
                  {display(snippet.address.zip[0], res)}-
                  {display(snippet.address.zip[1], res)}
                </div>
                <div className="phone">
                  {display(snippet.phone, res)}
                </div>
                <div className="email">
                  {display(snippet.email, res)}
                </div>
                {items}
              </div>
            </div>
          </div>
        )
    });
    return res;
  }

  return (
    <div>
        {(props.searchResults.results && props.searchResults.results.length) > 0 ? (
            <div>{getResults()}</div>
        ) : (
            <p>Try searching</p>
        )}
    </div>
  );
}

export default SearchResults;
