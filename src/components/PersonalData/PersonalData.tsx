import React from "react";
import DataTableValue from "../DataTableValue/DataTableValue";
import DataTableMultiValue from "../DataTableMultiValue/DataTableMultiValue";
import styles from "./PersonalData.module.scss";

type Props = {
  data?: any;
  config?: any
};

const PersonalData: React.FC<Props> = (props) => {

  return (
    <div className={styles.personal}>
        <DataTableValue config={props.config.name} />
        <DataTableValue config={props.config.phone} />
        <DataTableValue config={props.config.email} />
        <DataTableMultiValue config={props.config.address} />
    </div>
  );

};

export default PersonalData;