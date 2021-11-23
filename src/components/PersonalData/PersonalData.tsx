import React, {useContext} from "react";
import { DetailContext } from "../../store/DetailContext";
import DataTable from "../DataTable/DataTable";
import styles from "./PersonalData.module.scss";

type Props = {
  data?: any;
  config?: any
};

const PersonalData: React.FC<Props> = (props) => {

  const detailContext = useContext(DetailContext);

  return (
    <div className={styles.personal}>
        <DataTable config={props.config.name} data={detailContext.detail.entityInstanceProperties.name} />
        <DataTable config={props.config.phone} data={detailContext.detail.entityInstanceProperties.phone} />
        <DataTable config={props.config.email} data={detailContext.detail.entityInstanceProperties.email} />
    </div>
  );
};

export default PersonalData;
