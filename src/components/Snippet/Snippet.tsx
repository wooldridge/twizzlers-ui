import React, { useContext } from "react";
import { SearchContext } from "../../store/SearchContext";
import { DetailContext } from "../../store/DetailContext";
import styles from "./Snippet.module.scss";
import _ from "lodash";

type Props = {
  config?: any;
};

/**
 * Component for showing search results in snippet format.
 * Data payload provided by {@link SearchContext}.
 *
 * @component
 * @prop {object} config  Configuration object.
 * @prop {string} config.id  Path to ID.
 * @prop {object} config.thumbnail  Thumbnail configuration object.
 * @prop {string} config.thumbnail.src  Thumbnail source URL.
 * @prop {string} config.thumbnail.width  Thumbnail width (in pixels).
 * @prop {string} config.thumbnail.height  Thumbnail height (in pixels).
 * @prop {string} config.title  Path to title.
 * @prop {string} config.createOn  Path to date of creation.
 * @prop {object} config.address  Address configuration object.
 * @prop {string} config.address.street  Path to street.
 * @prop {string} config.address.city  Path to city.
 * @prop {string} config.address.state  Path to state.
 * @prop {string[]} config.address.zip  Array of paths to 5-digit and 4-digit codes.
 * @prop {string} config.phone  Path to phone.
 * @prop {string} config.email  Path to email.
 * @prop {string[]} config.items  Array of display value paths.
 * @example
 * {
 *   id: "personId",
 *   thumbnail: {
 *       src: "image",
 *       width: 100,
 *       height: 100
 *   },
 *   title: "name",
 *   createdOn: "createdOn",
 *   address: {
 *       street: "address.street",
 *       city: "address.city",
 *       state: "address.state",
 *       zip: ["address.zip.fiveDigit", "address.zip.plusFour"]
 *   },
 *   phone: "phone",
 *   email: "email",
 *   items: ["ssn", "status"]
 * }
 */
const Snippet: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);
  const detailContext = useContext(DetailContext);

  const handleNameClick = (e) => {
    console.log("handleNameClick", e);
    console.log("detailContext", detailContext);
    detailContext.handleDetail(e.target.id);
  };

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
    let res = searchContext.searchResults.results.map((res, index) => {
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
              src={getValue(snippet.thumbnail.src, res)}
              alt={getValue(snippet.title, res)}
            ></img>
          </div>
          <div className={styles.text}>
            <div className={styles.createdOn}>
                Created on: {displayDate(snippet.createdOn, res)}
            </div>
            <div className={styles.title} id={getValue(snippet.id, res)} onClick={handleNameClick}>
              {displayValue(snippet.title, res)}
              {/* <Link to={"/detail/" + getValue(snippet.id, res)}>{displayValue(snippet.title, res)}</Link> */}
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
      {(searchContext.searchResults.results && searchContext.searchResults.results.length) > 0 ? (
        <div>{getResults()}</div>
      ) : null
      }
    </div>
  );
};

export default Snippet;
