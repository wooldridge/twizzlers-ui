import React from "react";
import "./Chiclet.scss";
import {colors} from "../../config/colors";
import _ from "lodash";

type Props = {
  config?: any;
  data?: any;
  style?: any;
};

/**
 * Component for showing value in colored container.
 *
 * @component
 * @example
 * TBD
 */
const Chiclet: React.FC<Props> = (props) => {

    const chicletColors = props.config.colors ? 
        colors[props.config.colors] ? colors[props.config.colors] : {} : {};

    let val;
    if (props.children) {
        val = props.children;
    } else {
        val = _.get(props.data, props.config.value, null);
        val = _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
    }

    let chicletStyle: any = props.config.style ? props.config.style : {};
    chicletStyle = Object.assign({backgroundColor: chicletColors[val]}, chicletStyle);

    return (
        <span className="Chiclet" style={Object.assign({backgroundColor: chicletColors[val]}, chicletStyle)}>
            {val}
        </span>
    );
};

export default Chiclet;
