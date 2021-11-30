import React from "react";
import styles from "./Recent.module.scss";

type Props = {
  data?: any;
  config?: any
};

/**
 * Component for showing recently viewed records.
 *
 * @component
 * @prop {object} data - Data payload.
 * @prop {object[]} config  Array of configuration objects.
 * @example
 * TBD
 */
const Recent: React.FC<Props> = (props) => {

  return (
    <div className={styles.recent}>
        Recently Visited content...
    </div>
  );
};

export default Recent;
