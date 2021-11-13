import React from "react";
import styles from "./Section.module.scss";

type Props = {
    title: string;
    width?: string;
};

const Section: React.FC<Props> = (props) => {

  let divStyle = {
    width: props.width ? props.width : "100%"
  };

  return (
    <div className={styles.section} style={divStyle}>
      <header><span>{props.title}</span></header>
      <main>{props.children}</main>
    </div>
  );
};

export default Section;
