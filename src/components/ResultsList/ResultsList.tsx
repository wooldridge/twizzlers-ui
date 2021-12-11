import React, { useContext } from "react";
import { SearchContext } from "../../store/SearchContext";
import { DetailContext } from "../../store/DetailContext";
import {GearFill, CodeSlash, ArrowRepeat} from "react-bootstrap-icons";
import styles from "./ResultsList.module.scss";
import {colors} from "../../config/colors";
import _ from "lodash";

type Props = {
  config?: any;
};

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
    console.log("detailContext", detailContext);
    detailContext.handleDetail(e.target.id);
  };

  // TODO different than displayValue?
  const getValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const getArrayValue = (key, res) => {
    let val = _.get(res, key);
    return Array.isArray(val) ? val : [val];
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
    let res = searchContext.searchResults.result.map((res, index) => {
      let items = props.config.items.map((it, index) => {
        let val = _.isObject(it) ? it.value : it;
        return (
          <div key={"item-" + index} className={styles.items}>
            <span className={styles[it.class]} style={it.style}>{displayValue(val, res)}</span>
          </div>
        );
      });
      return (
        <div key={"result-" + index} className={styles.result}>
          <div className={styles.thumbnail}>
            {props.config.thumbnail ? 
            <img
              src={getValue(props.config.thumbnail.src, res)}
              alt={getValue(props.config.title, res)}
            ></img> : null}
          </div>
          <div className={styles.details}>
            <div className={styles.title} id={getValue(props.config.id, res)} onClick={handleNameClick}>
              {displayValue(props.config.title, res)}
            </div>
            <div className={styles.subtitle}>
              {props.config.address ? 
              <div className={styles.address}>
                {displayValue(props.config.address.street, res)},&nbsp;
                {displayValue(props.config.address.city, res)},&nbsp;
                {displayValue(props.config.address.state, res)}&nbsp;
                {displayValue(props.config.address.zip[0], res)}-
                {displayValue(props.config.address.zip[1], res)}
              </div> : null}
              {items}
            </div>
            {props.config.categories ? 
            <div className={styles.categories}>
              {getArrayValue(props.config.categories, res).map(s => {
                return (
                  <div key={"cat-" + index} style={{backgroundColor: colors.sourceColors[s]}}>{s}</div>
                )
              })}
            </div> : null}
          </div>
          <div className={styles.actions}>
            {props.config.timestamp ? 
            <div className={styles.timestamp}>
              {props.config.timestamp.label} {displayDate(props.config.timestamp.value, res)}
            </div> : null}
            <div className={styles.icons}>
              {props.config.status ? 
              <div className={styles.status}>
                {displayValue(props.config.status, res)}
              </div> : null}
              <GearFill color="#5d6aaa" size={16} />
              <CodeSlash color="#5d6aaa" size={16} />
              <ArrowRepeat color="#5d6aaa" size={16} />
            </div>
          </div>
        </div>
      );
    });
    return res;
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