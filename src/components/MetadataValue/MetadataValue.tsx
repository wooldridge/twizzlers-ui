import React from "react";
import Chiclet from "../Chiclet/Chiclet";
import DateTime from "../DateTime/DateTime";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
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

    const displayValue = (config, data) => {
        if (config.type === "datetime") {
            return <DateTime config={config} data={data} />
        } else if (config.type === "chiclet") {
            return <Chiclet config={config} data={data} />
        }
        let val: any = _.get(data, config.value, null);
        return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : 
            <span>{val}</span>
        );
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
                                                {displayValue(col, d)}
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
