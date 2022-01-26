import React from "react";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import {colors} from "../../config/colors";
import "./MetadataValue.scss";
import _ from "lodash";

type Props = {
  config?: any;
  data?: any;
  styles?: any;
};

// TODO using mock data temporarily
const data = [
    {
        name: "New York Times",
        timestamp: "2021-11-19T01:35:35.296391-08:00"
    },
    {
        name: "Los Angeles Times",
        timestamp: "2021-12-21T11:29:44.296391-08:00"
    },
    {
        name: "USA Today",
        timestamp: "2022-01-05T18:20:03.296391-08:00"
    }
];

/**
 * Component for showing metadata in the form of square icons.
 *
 * @component
 * @example
 * TBD
 */
const MetadataValue: React.FC<Props> = (props) => {

    const metaColors = props.config.popover ? 
        colors[props.config.popover.colors] ? colors[props.config.popover.colors] : {} : {};

    const displayValue = (key, res, type) => {
        console.log(key, res, type);
        if (type === "date") {
            return displayDate(key, res);
        }
        let val: any = _.get(res, key, null);
        return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : 
            <span style={{backgroundColor: (type === "chiclet") ? metaColors[val] : ""}}>{val}</span>
        );
    };

    const displayDate = (key, results) => {
        let val: any = _.get(results, key);
        val = _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
        let parts: any = val.split("T");
        return _.isNil(parts[0]) ? null : parts[0];
    };

    const getPopover = () => {
        if (props.config.popover) {
            return (
                <Popover id="popover-basic">
                    <Popover.Header>{props.config.popover.title}</Popover.Header>
                    <Popover.Body>
                        <Table size="sm">
                            <tbody>{data.map((d, i) => {return (
                                <tr>
                                    {props.config.popover.cols.map(col => { return (
                                        <td className={col.type}>
                                                {displayValue(col.value, d, col.type)}
                                        </td>
                                    )})}
                                </tr>
                            )})}</tbody>
                        </Table>
                    </Popover.Body>
                </Popover>
            )
        } else {
            return <div></div>;
        }
    };

    const getMetadata = () => { return (
        <div className={props.config.popover ? "hasPopover" : ""} style={{backgroundColor: props.config.color ? props.config.color : "lightgray"}}>
            {props.config.value}
        </div>
    )};

    const getOverlay = () => { return (
        <OverlayTrigger 
            trigger="click" 
            placement={props.config.placement ? props.config.placement : "right"} 
            overlay={getPopover()}
        >
            {getMetadata()}
        </OverlayTrigger>
    )};

    return (
        <span className="MetadataValue">
            { props.config.popover ? getOverlay() : getMetadata() }
        </span>
    );
};

export default MetadataValue;
