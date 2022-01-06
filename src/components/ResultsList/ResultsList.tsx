import React, { useContext } from "react";
import Address from "../Address/Address";
import { SearchContext } from "../../store/SearchContext";
import { DetailContext } from "../../store/DetailContext";
import {GearFill, CodeSlash, ArrowRepeat} from "react-bootstrap-icons";
import styles from "./ResultsList.module.scss";
import {colors} from "../../config/colors";
import _ from "lodash";

type Props = {
  config?: any;
};

const COMPONENTS = {
  Address: Address
}

/**
 * Component for showing search results in list format.
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
const ResultsList: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);
  const detailContext = useContext(DetailContext);

  const handleNameClick = (e) => {
    console.log("handleNameClick", e);

    detailContext.handleDetail(e.target.id);
  };

  // TODO different than displayValue?
  const getValue = (key, results) => {
    let val = _.get(results, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const getArrayValue = (key, results) => {
    let val = _.get(results, key);
    return Array.isArray(val) ? val : [val];
  };

  const displayValue = (key, results) => {
    let val = _.get(results, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const displayDate = (key, results) => {
    let val = _.get(results, key);
    let parts = val.split("T");
    return _.isNil(parts[0]) ? null : parts[0];
  };

  const getResults = () => {
    let results = searchContext.searchResults.result.map((results, index) => {
      let items = props.config.items.map((it, index) => {
        if (it.component) {
          return React.createElement(COMPONENTS[it.component], { config: it.config, data: results, styles: it.styles }, null);
        }
        let val = _.isObject(it) ? it.value : it;
        return (
          <div key={"item-" + index} className={styles.items}>
            <span className={styles[it.class]} style={it.style}>{displayValue(val, results)}</span>
          </div>
        );
      });
      return (
        <div key={"result-" + index} className={styles.result}>
          <div className={styles.thumbnail}>
            {props.config.thumbnail ? 
            <img
              src={getValue(props.config.thumbnail.src, results)}
              alt={getValue(props.config.title, results)}
            ></img> : null}
          </div>
          <div className={styles.details}>
            <div className={styles.title} id={getValue(props.config.id, results)} onClick={handleNameClick}>
              {displayValue(props.config.title, results)}
            </div>
            <div className={styles.subtitle}>
              {items}
            </div>
            {props.config.categories ? 
            <div className={styles.categories}>
              {getArrayValue(props.config.categories, results).map(s => {
                return (
                  <div key={"cat-" + index} style={{backgroundColor: colors.sourceColors[s]}}>{s}</div>
                )
              })}
            </div> : null}
          </div>
          <div className={styles.actions}>
            {props.config.timestamp ? 
            <div className={styles.timestamp}>
              {props.config.timestamp.label} {displayDate(props.config.timestamp.value, results)}
            </div> : null}
            <div className={styles.icons}>
              {props.config.status ? 
              <div className={styles.status}>
                {displayValue(props.config.status, results)}
              </div> : null}
              {/* <GearFill color="#5d6aaa" size={16} />
              <CodeSlash color="#5d6aaa" size={16} />
              <ArrowRepeat color="#5d6aaa" size={16} /> */}
            </div>
          </div>
        </div>
      );
    });
    return results;
  };

  return (
    <div>
      {(searchContext.searchResults?.result?.length) > 0 ? (
        <div>{getResults()}</div>
      ) : null
      }
    </div>
  );
};

export default ResultsList;
