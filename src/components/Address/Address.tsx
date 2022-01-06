import React from "react";
import "./Address.scss";
import _ from "lodash";

type Props = {
  config?: any;
  data?: any;
  styles?: any;
};

/**
 * Component for showing address information for a location.
 *
 * @component
 * @example
 * TBD
 */
const Address: React.FC<Props> = (props) => {

    const getValue = (key, data) => {
        let val = _.get(data, key);
        return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
    };

    const display = (val, pre, post) => {
        return val ? (<span>{"".concat(pre, val, post)}</span>) : null;
    }

    const addressStyle = props.styles ? props.styles : {};

    return (
        <div className="Address" style={addressStyle}>
            {display(getValue(props.config.street1, props.data), "", ", ")}
            {display(getValue(props.config.street2, props.data), "", ", ")}
            {display(getValue(props.config.city, props.data), "", ", ")}
            {display(getValue(props.config.state, props.data), "", " ")}
            {display(getValue(props.config.postal1, props.data), "", "")}
            {display(getValue(props.config.postal2, props.data), "-", "")}
        </div>
    );
};

export default Address;
