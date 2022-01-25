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
        let val: any = _.get(data, key, null);
        return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
    };

    const display = (val, pre, post) => {
        return val ? "".concat(pre, val, post) : "";
    }

    const addressStyle: any = props.styles ? props.styles : {};

    // Get address-containing object (if array, use first element)
    const addressData = props.config.addressPath ? getValue(props.config.addressPath, props.data) : props.data;

    const street1: any = getValue(props.config.street1, addressData) || null;
    const street2: any = getValue(props.config.street2, addressData) || null;
    const city: any = getValue(props.config.city, addressData) || null;
    const state: any = getValue(props.config.state, addressData) || null;
    const postal1: any = getValue(props.config.postal1, addressData) || null;
    const postal2: any = getValue(props.config.postal2, addressData) || null;

    const addrFormatted: string = display(street1, "", (street2 || city) ? ", " : "") +
                          display(street2, "", city ? ", " : "") +
                          display(city, "", state ? ", " : "") +
                          display(state, "", " ") +
                          display(postal1, "", "") +
                          display(postal2, "-", "");

    return (
        <span className="Address" style={addressStyle} title={addrFormatted}>
            {addrFormatted}
        </span>
    );
};

export default Address;
