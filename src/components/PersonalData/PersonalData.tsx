import React, {useContext} from "react";
import { DetailContext } from "../../store/DetailContext";
import DataTable from "../DataTable/DataTable";
import DataTableAddress from "../DataTableAddress/DataTableAddress";
import styles from "./PersonalData.module.scss";

type Props = {
  data?: any;
  config?: any
};

const PersonalData: React.FC<Props> = (props) => {

  const detailContext = useContext(DetailContext);

  return (
    <div className={styles.personal}>
        <DataTable config={props.config.name} data={detailContext.detail.result[0].extracted.person.name} />
        <DataTable config={props.config.phone} data={detailContext.detail.result[0].extracted.person.phone} />
        <DataTable config={props.config.email} data={detailContext.detail.result[0].extracted.person.email} />
        <DataTableAddress config={props.config.address} data={detailContext.detail.result[0]} />
    </div>
  );
};

export default PersonalData;
