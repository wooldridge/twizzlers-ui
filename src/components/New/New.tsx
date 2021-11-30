import React from "react";
import styles from "./New.module.scss";

type Props = {
  data?: any;
  config?: any
};

/**
 * Component for showing summary of new activity in application.
 *
 * @component
 * @prop {object} data - Data payload.
 * @prop {object[]} config  Array of configuration objects.
 * @example
 * TBD
 */
const New: React.FC<Props> = (props) => {

  return (
    <div className={styles.new}>
        What's New content...
    </div>
  );
};

export default New;
