import React, { useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import { DetailContext } from "../../store/DetailContext";
import "./DataTableValue.scss";
import {ArrowBarDown, ArrowBarUp, EnvelopeFill, TelephoneFill} from "react-bootstrap-icons";
import _ from "lodash";

type Props = {
  config?: any
};

/**
 * Component for showing one or more values for a single property value in a tabular view.
 *
 * @component
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
const DataTableValue: React.FC<Props> = (props) => {

    const detailContext = useContext(DetailContext);
    const [hide, setHide] = useState<boolean>(false);

    const handleHide = (e) => {
        setHide(!hide);
    };

    let hideClass = hide ? "hide" : "";
    let tableStyle = {
        width: props.config.width ? props.config.width + 'px' : "100%"
    };

    const getArrayValue = (key, results) => {
        let val = _.get(results, key);
        return Array.isArray(val) ? val : [val];
    };
    let data = getArrayValue(props.config.property, detailContext.detail);

    const getIcon = (type) => {
        if (type === "phone") {
            return (<div>
                <TelephoneFill color="#5fc9aa" size={14} data-testid={"icon-"+ type} />
            </div>);
        } else if (type === "email") {
            return (<div>
                <EnvelopeFill color="#5fc9aa" size={14} data-testid={"icon-"+ type} />
            </div>);
        }
    };

    return (
        <div className="dataTableValue">
            <div className="label">
                <span className="title">{props.config.title}</span>
                {data.length > 1 ?
                    <span className="hide" onClick={handleHide}>
                        {hide ? 
                        <ArrowBarDown 
                            data-testid="hideDown"
                            color="#5d6aaa" 
                            size={18} 
                        /> : 
                        <ArrowBarUp 
                            data-testid="hideUp"
                            color="#5d6aaa" 
                            size={18} 
                        />}
                    </span> : null}
            </div>
            <Table size="sm" style={tableStyle} id={props.config.id} className={hideClass}>
                <tbody>
                    {data.map((d, i) => {
                        return (
                            <tr key={"row-" + i}>
                                {props.config.icon &&
                                <td key={"icon-" + i} className="icon">
                                    {i === 0 ? getIcon(props.config.icon) : null}
                                </td>}
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

export default DataTableValue;
