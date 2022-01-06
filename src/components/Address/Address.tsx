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
        return val ? "".concat(pre, val, post) : "";
    }

    const addressStyle = props.styles ? props.styles : {};

    const street1 = getValue(props.config.street1, props.data) || null;
    const street2 = getValue(props.config.street2, props.data) || null;
    const city = getValue(props.config.city, props.data) || null;
    const state = getValue(props.config.state, props.data) || null;
    const postal1 = getValue(props.config.postal1, props.data) || null;
    const postal2 = getValue(props.config.postal2, props.data) || null;

    const addrFormatted = display(street1, "", ", ") +
                          display(street2, "", ", ") +
                          display(city, "", ", ") +
                          display(state, "", ", ") +
                          display(postal1, "", "") +
                          display(postal2, "-", "");

    return (
        <span className="Address" style={addressStyle} title={addrFormatted}>
            {addrFormatted}
        </span>
    );
};

export default Address;
