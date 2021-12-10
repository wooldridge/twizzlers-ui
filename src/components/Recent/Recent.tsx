import React, { useContext } from "react";
import { DetailContext } from "../../store/DetailContext";
import styles from "./Recent.module.scss";
import _ from "lodash";
import {ExclamationTriangleFill} from "react-bootstrap-icons";

type Props = {
  data: any;
  config: any
};

// TODO store color-to-source mapping in config
const sourceColors = {
  "New York Times": "#cfe3e9",
  "USA Today": "#f7e9d5",
  "Los Angeles Times": "#f6e4e0",
  "Wall Street Journal": "#f1f6dc",
  "Washington Post": "#cfe3e9",
  "Chicago Tribune": "#f7e9d5",
};

/**
 * Component for showing recently viewed records.
 *
 * @component
 * @prop {object} data Data payload.
 * @prop {object} config  Configuration object.
 * @prop {string} config.id  Path to ID.
 * @prop {object} config.thumbnail  Thumbnail configuration object.
 * @prop {string} config.thumbnail.src  Thumbnail source URL.
 * @prop {string} config.thumbnail.width  Thumbnail width (in pixels).
 * @prop {string} config.thumbnail.height  Thumbnail height (in pixels).
 * @prop {string} config.title  Path to title.
 * @prop {object} config.address  Address configuration object.
 * @prop {string} config.address.street  Path to street.
 * @prop {string} config.address.city  Path to city.
 * @prop {string} config.address.state  Path to state.
 * @prop {string[]} config.address.zip  Array of paths to 5-digit and 4-digit codes.
 * @prop {string[]} config.items  Array of paths to properties to display.
 * @prop {string} config.categories  Path to array of sources.
 * @example
 * {
 *   id: "personId",
 *   thumbnail: {
 *     src: "imageUrl",
 *     width: "100px",
 *     height: "100px"
 *   },
 *   title: "name",
 *   address: {
 *     street: "address.street",
 *     city: "address.city",
 *     state: "address.state",
 *     zip: ["address.zip.fiveDigit", "address.zip.plusFour"]
 *   },
 *   items: ["phone", "email"],
 *   categories: "sources"
 * }
 */
const Recent: React.FC<Props> = (props) => {

  console.log("props.recent", props.data);

  const detailContext = useContext(DetailContext);

  const handleNameClick = (e) => {
    console.log("handleNameClick", e);
    console.log("detailContext", detailContext);
    detailContext.handleDetail(e.target.id);
  };

  // TODO different than displayValue?
  const getValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : val;
  };

  const getArrayValue = (key, res) => {
    let val = _.get(res, key);
    return Array.isArray(val) ? val : [val];
  };

  const displayValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const getRecent = () => {
    console.log("props.data", props.data);
    console.log("props.config", props.config);
    let res = props.data.map((recent, index) => {
      let items = props.config.items.map((it, index) => {
        return (
          <div key={"item-" + index} className={styles.item}>
            {displayValue(it, recent)}
          </div>
        );
      });
      return (
        <div key={"recent-" + index} className={styles.result}>
          <div className={styles.alert}>
            {recent.alert ? <ExclamationTriangleFill color="#d48b32" size={16} /> : null}
          </div>
          <div className={styles.thumbnail}>
            <img
              src={getValue(props.config.thumbnail.src, recent)}
              alt={getValue(props.config.title, recent)}
              style={{width: props.config.thumbnail.width, height: props.config.thumbnail.height}}
            ></img>
          </div>
          <div className={styles.text}>
            <div className={styles.title} id={getValue(props.config.id, recent)} onClick={handleNameClick}>
              {displayValue(props.config.title, recent)}
            </div>
            <div className={styles.address}>
              {displayValue(props.config.address.street, recent)},&nbsp;
              {displayValue(props.config.address.city, recent)},&nbsp;
              {displayValue(props.config.address.state, recent)}&nbsp;
              {displayValue(props.config.address.zip[0], recent)}-
              {displayValue(props.config.address.zip[1], recent)}
            </div>
            <div className={styles.items}>
              {items}
            </div>
            <div className={styles.categories}>
              {getArrayValue(props.config.categories, recent).map((s, i) => {
                return (
                  <div key={"category-" + i} style={{backgroundColor: sourceColors[s]}}>{s}</div>
                )
              })}
            </div>
          </div>
        </div>
      );
    });
    return res;
  };

  return (
    <div>
      {(props.data && props.data.length > 0) ? (
        <div className={styles.recent}>{getRecent()}</div>
      ) : null
      }
    </div>
  );
};

export default Recent;
