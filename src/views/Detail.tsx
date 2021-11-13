import React from "react";
import {Link} from "react-router-dom";
import styles from "./Detail.module.scss";

type Props = {};

const Detail: React.FC<Props> = (props) => {

  return (

    <div className={styles.detail}>

      <h1>Detail Page</h1>
      <p><Link to="/search">Search Page Link</Link></p>

    </div>
  );
};

export default Detail;
