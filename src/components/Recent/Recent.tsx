import React, { useContext } from "react";
import { DetailContext } from "../../store/DetailContext";
import styles from "./Recent.module.scss";
import _ from "lodash";
import {ExclamationTriangleFill} from "react-bootstrap-icons";

type Props = {
  data?: any;
  config?: any
};

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
 * @prop {object} data - Data payload.
 * @prop {object[]} config  Array of configuration objects.
 * @example
 * TBD
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

  const displayValue = (key, res) => {
    let val = _.get(res, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const getRecent = () => {
    console.log("props.data", props.data);
    console.log("props.config", props.config);
    let res = props.data.map((recent, index) => {
      return (
        <div key={"recent-" + index} className={styles.result}>
          <div className={styles.alert}>
            {recent.alert ? <ExclamationTriangleFill color="#d48b32" size={16} /> : null}
          </div>
          <div className={styles.thumbnail}>
            <img
              src={getValue(props.config.thumbnail.src, recent)}
              alt={getValue(props.config.title, recent)}
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
              <div className={styles.phone}>
                {displayValue(props.config.phone, recent)}
              </div>
              <div className={styles.email}>
                {displayValue(props.config.email, recent)}
              </div>
            </div>
            <div className={styles.sources}>
              {getValue(props.config.sources, recent).map(s => {
                return (
                  <div style={{backgroundColor: sourceColors[s]}}>{s}</div>
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
