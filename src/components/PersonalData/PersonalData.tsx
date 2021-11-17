import React from "react";
import styles from "./PersonalData.module.scss";

type Props = {
  data?: any;
  config?: any
};

const PersonalData: React.FC<Props> = (props) => {

  return (
    <div className={styles.personal}>
        Personal Info content...
    </div>
  );
};

export default PersonalData;
