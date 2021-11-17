import React, { useContext } from "react";
import SearchContext from "../../store/search-context";
import { Link } from "react-router-dom";
import styles from "./Snippet.module.scss";
import _ from "lodash";

type Props = {
  config?: any;
};

const SearchResults: React.FC<Props> = (props) => {

  const ctx = useContext(SearchContext);

  // TODO different than displayValue?
  const getValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const displayValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const displayDate = (key, res) => {
    let val = _.get(res, key);
    let parts = val.split("T");
    return _.isNil(parts[0]) ? null : parts[0];
  };

  const getResults = () => {
    let snippet = props.config;
    let res = ctx.searchResults.results.map((res, index) => {
      let items = snippet.items.map((it, index) => {
        return (
          <div key={"item-" + index} className={styles.items}>
            {displayValue(it, res)}
          </div>
        );
      });
      return (
        <div key={"result-" + index} className={styles.result}>
          <div className={styles.thumbnail}>
            <img
              src={displayValue(snippet.thumbnail.src, res)}
              alt={displayValue(snippet.title, res)}
            ></img>
          </div>
          <div className={styles.text}>
            <div className={styles.createdOn}>
                Created on: {displayDate(snippet.createdOn, res)}
            </div>
            <div className={styles.title}>
              <Link to={"/detail/" + getValue(snippet.id, res)}>{displayValue(snippet.title, res)}</Link>
            </div>
            <div className={styles.subtitle}>
              <div className={styles.address}>
                {displayValue(snippet.address.street, res)},&nbsp;
                {displayValue(snippet.address.city, res)},&nbsp;
                {displayValue(snippet.address.state, res)}&nbsp;
                {displayValue(snippet.address.zip[0], res)}-
                {displayValue(snippet.address.zip[1], res)}
              </div>
              <div className={styles.phone}>
                {displayValue(snippet.phone, res)}
              </div>
              <div className={styles.email}>
                {displayValue(snippet.email, res)}
              </div>
              {items}
            </div>
          </div>
        </div>
      );
    });
    return res;
  };

  return (
    <div>
      {(ctx.searchResults.results && ctx.searchResults.results.length) > 0 ? (
        <div>{getResults()}</div>
      ) : null
      }
    </div>
  );
};

export default SearchResults;
