import React from "react";
import Table from "react-bootstrap/Table";
import styles from "./DataTableAddress.module.scss";
import "./DataTableAddress.scss";
import {ArrowBarDown, GeoAltFill} from "react-bootstrap-icons";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import _ from "lodash";
import GeoMap from "../GeoMap/GeoMap"


type Props = {
  data?: any;
  config?: any
};

/**
 * Component for showing one or more values for a property in a tabular view.
 *
 * @component
 * @prop {object} data - Data payload.
 * @prop {object} config  Data table configuration object.
 * @prop {string} config.title - Table label.
 * @prop {string} config.width - Width of table (in pixels).
 * @prop {object[]} config.cols - Configuration objects for columns.
 * @prop {string} config.cols[].title - Column heading title.
 * @prop {string} config.cols[].value - Path to value in data payload.
 * @prop {object[]} config.labels - Configuration objects for label icons.
 * @prop {string} config.labels[].type - Label type (e.g. "block").
 * @prop {string} config.labels[].color - Label color (HTML color code).
 * @prop {string} config.labels[].value - Label value.
 * @example
 * {
 *   title: "Address",
 *   width: 600,
 *   cols: [
 *      {
 *          title: "Street",
 *          type: "text",
 *          value: "path.to.street"
 *      },
 *      {
 *          title: "City",
 *          type: "text",
 *          value: "path.to.city"
 *      }
 *   ],
 *   labels: [
 *     {
 *       type: "block",
 *       color: "#96bde4",
 *       value: "A"
 *     }
 *   ]
 * }
 */
const DataTableAddress: React.FC<Props> = (props) => {

    let tableStyle = {
        width: props.config.width ? props.config.width + 'px' : "100%"
    };

    let data = _.isArray(props.data) ? props.data : [props.data];

    const displayValue = (key, res) => {
        let val = _.get(res, key);
        return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
    };

    const popover = (
        <Popover id="mapPopover">
          <Popover.Body>
            <GeoMap />
          </Popover.Body>
        </Popover>
    );

    return (
        <div className="dataTableAddress">
            <div className="title">
                <span>{props.config.title}</span>
                {data.length > 1 ?
                    <span className="show">
                        <ArrowBarDown color="#5d6aaa" size={18} />
                    </span> : null}
            </div>
            <Table size="sm" hover style={tableStyle}>
            <thead>
                <tr>
                    {_.isArray(props.config.cols) && props.config.cols.map((col, i) => {
                        return (
                            <th key={"head-" + i}>{col.title}</th>
                        );
                    })}
                    {_.isArray(props.config.labels) && props.config.labels.map((col, i2) => {
                        return (
                            <th key={"head-" + (i2 + props.config.cols.length)}></th>
                        );
                    })}
                    <th key={"head-map"}></th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => {
                return (
                    <tr key={"row-" + i}>
                        {_.isArray(props.config.cols) && props.config.cols.map((col, i) => {
                            return (
                                <td key={"data-" + i}><span className={styles.rowValue}>{displayValue(col.value, d)}</span></td>
                            );
                        })}
                        {_.isArray(props.config.labels) && props.config.labels.map((label, i2) => {
                            return (
                                <td key={"label-" + (i2 + props.config.cols.length)}>
                                    <div className="labelValue">{label.value}</div>
                                </td>
                            );
                        })}
                        <td key={"map"}>
                            <div className="mapTrigger">
                                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                    <GeoAltFill color="#5d6aaa" size={19} />
                                </OverlayTrigger>
                            </div>
                        </td>
                    </tr>
                );
                })}
            </tbody>
            </Table>
        </div>
    );
};

export default DataTableAddress;
