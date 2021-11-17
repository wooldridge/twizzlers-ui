import React from "react";
import styles from "./Occupations.module.scss";

type Props = {
  data?: any;
  config?: any
};

const Occupations: React.FC<Props> = (props) => {

  return (
    <div className={styles.occupations}>
        Occupations content...
    </div>
  );
};

export default Occupations;
