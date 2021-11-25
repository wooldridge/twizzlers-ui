import React, { useContext } from "react";
import { SearchContext } from "../../store/SearchContext";
import Table from "react-bootstrap/Table";
import styles from "./Saved.module.scss";
import "./Saved.scss";
import {ExclamationTriangleFill, EyeFill} from "react-bootstrap-icons";
import _ from "lodash";

type Props = {
  data?: any;
  config?: any
};

const Saved: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);

  const handleClick = (opts) => () => {
    console.log("handleClick");
    searchContext.handleSaved(opts);
  }

  function display(cfg, row) {
    if (cfg.type === "text") {
      return row[cfg.value];
    } else if (cfg.type === "date") {
      let parts = row[cfg.value].split("T");
      return _.isNil(parts[0]) ? null : parts[0];
    } else if (cfg.type === "icon") {
      return cfg.test.call(null, row[cfg.value]) ?
        (cfg.value === "hasChanges") ?
          <ExclamationTriangleFill color="#d48b32" size={16} /> :
          <EyeFill color="#e96d80" size={16} /> :
        null;
    }
  }

  return (
    <div className={styles.saved}>
      <Table hover>
        <thead>
          <tr>
            {_.isArray(props.config.cols) && props.config.cols.map((c, i) => {
              return (
                <th key={"col-" + i} className={c.value}>{c.title}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {_.isArray(props.data) && props.data.map((r, i) => {
            return (
              <tr key={"row-" + i}>
                {_.isArray(props.config.cols) && props.config.cols.map((c, i) => {
                  return (
                    <td key={"dat-" + i} className={c.value} onClick={handleClick(r.query)}>{display(c, r)}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Saved;
