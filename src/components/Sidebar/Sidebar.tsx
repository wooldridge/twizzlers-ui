import React from "react";
import SummaryMeter from "../SummaryMeter/SummaryMeter";
import Facets from "../Facets/Facets";
import styles from "./Sidebar.module.scss";

type Props = {
  data?: any;
  config?: any;
};

const Sidebar: React.FC<Props> = (props) => {
  return (
    <div className={styles.sidebar}>
      <SummaryMeter config={props.config.meter} />
      <Facets config={props.config.facets} />
    </div>
  );
};

export default Sidebar;
