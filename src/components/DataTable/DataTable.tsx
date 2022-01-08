import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import styles from "./DataTable.module.scss";
import "./DataTable.scss";
import {ArrowBarDown, ArrowBarUp, EnvelopeFill, TelephoneFill} from "react-bootstrap-icons";
import _ from "lodash";

type Props = {
  data?: any;
  config?: any
};

/**
 * Component for showing one or more values for a property in a tabular view.
 *
 * @component
 * @prop {object} data - Data payload.
 * @prop {object} config - Data table configuration object.
 * @prop {object} config.id - ID for table, added as element id attribute.
 * @prop {string} config.title - Table label.
 * @prop {string} config.property - Path to values in payload.
 * @prop {string} config.width - Width of table (in pixels).
 * @prop {object[]} config.labels - Configuration objects for label icons.
 * @prop {string} config.labels[].type - Label type (e.g. "block").
 * @prop {string} config.labels[].color - Label color (HTML color code).
 * @prop {string} config.labels[].value - Label value.
 * @example
 * {
 *   title: "Name",
 *   property: "path.to.name",
 *   width: 300,
 *   labels: [
 *     {
 *       type: "block",
 *       color: "#96bde4",
 *       value: "A"
 *     }
 *   ]
 * }
 */
const DataTable: React.FC<Props> = (props) => {

    const [hide, setHide] = useState<boolean>(false);

    const handleHide = (e) => {
        setHide(!hide);
    };

    let hideClass = hide ? "hide" : "";

    let tableStyle = {
        width: props.config.width ? props.config.width + 'px' : "100%"
    };

    let data = _.isArray(props.data) ? props.data : [props.data];

    return (
        <div className="dataTable">
            <div className="label">
                <span className="title">{props.config.title}</span>
                {data.length > 1 ?
                    <span className="hide" onClick={handleHide}>
                        {hide ? <ArrowBarDown color="#5d6aaa" size={18} /> : <ArrowBarUp color="#5d6aaa" size={18} />}
                    </span> : null}
            </div>
            <Table size="sm" hover style={tableStyle} id={props.config.id} className={hideClass}>
            <tbody>
                {data.map((d, i) => {
                return (
                    <tr key={"row-" + i}>
                        {props.config.icon === "phone" ?
                            <td key={"icon-" + i} className="icon">
                                {i === 0 ? <div><TelephoneFill color="#5fc9aa" size={14} /></div> : null}
                            </td> : null}
                        {props.config.icon === "email" ?
                            <td key={"icon-" + i} className="icon">
                                {i === 0 ? <div><EnvelopeFill color="#5fc9aa" size={14} /></div> : null}
                            </td> : null}
                        <td key={"data-" + i} className="value">
                            <div>{d}</div>
                        </td>
                        {_.isArray(props.config.metadata) && props.config.metadata.map((meta, i2) => {
                        return (
                            <td key={"metadata-" + i2} className="metadata">
                                <div>{meta.value}</div>
                            </td>
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

export default DataTable;
