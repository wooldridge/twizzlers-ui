import React from "react";
import styles from "./Recent.module.scss";

type Props = {
  data?: any;
  config?: any
};

const Recent: React.FC<Props> = (props) => {

  return (
    <div className={styles.recent}>
        Recently Visited content...
    </div>
  );
};

export default Recent;
