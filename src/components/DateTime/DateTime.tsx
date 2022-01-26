import React from "react";
import "./DateTime.scss";
import _ from "lodash";
import { DateTime as dt } from "luxon";

type Props = {
  config?: any;
  data?: any;
  style?: any;
};

/**
 * Component for showing date and time information.
 *
 * @component
 * @example
 * TBD
 */
const DateTime: React.FC<Props> = (props) => {

    const getValue = (key, data) => {
        let val: any = _.get(data, key, null);
        return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
    };

    let formattedDateTime;
    formattedDateTime = getValue(props.config.value, props.data);
    formattedDateTime = dt.fromISO(formattedDateTime).toFormat(props.config.format);
    formattedDateTime = props.config.label ? props.config.label + " " + formattedDateTime : formattedDateTime;

    const dateTimeStyle: any = props.style ? props.style : {};

    return (
        <span className="DateTime" style={dateTimeStyle}>
            {formattedDateTime}
        </span>
    );
};

export default DateTime;
