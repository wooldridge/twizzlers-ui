import React from "react";
import Facets from "../Facets/Facets";
import styles from "./Sidebar.module.scss";

type Props = {
  data?: any;
  config?: any;
};

const Sidebar: React.FC<Props> = (props) => {
  return (
    <div className={styles.sidebar}>
      <Facets config={props.config.facets} />
    </div>
  );
};

export default Sidebar;
