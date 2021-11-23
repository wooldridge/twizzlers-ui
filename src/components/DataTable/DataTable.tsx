import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import styles from "./DataTable.module.scss";
import "./DataTable.scss";
import { DetailContext } from "../../store/DetailContext";
import {ArrowBarDown} from "react-bootstrap-icons";
import _ from "lodash";

type Props = {
  data?: any;
  config?: any
};

const DataTable: React.FC<Props> = (props) => {

    const detailContext = useContext(DetailContext);

    let tableStyle = {
        width: props.config.width ? props.config.width + 'px' : "100%"
    };

    let data = _.isArray(props.data) ? props.data : [props.data];

    return (
        <div className="dataTable">
            <div className="title">
                <span>{props.config.title}</span>
                {data.length > 1 ?
                    <span className="show">
                        <ArrowBarDown color="#5d6aaa" size={18} />
                    </span> : null}
            </div>
            <Table size="sm" hover style={tableStyle}>
            <tbody>
                {data.map((d, i) => {
                return (
                    <tr key={"row-" + i}>
                        <td key={"data-" + i}><span className={styles.rowValue}>{d}</span></td>
                        {_.isArray(props.config.labels) && props.config.labels.map((label, i2) => {
                            return (
                                <td key={"label-" + i2}>
                                    <div className="labelValue">{label.value}</div>
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
