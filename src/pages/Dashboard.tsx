import React from 'react';
import { Link } from "react-router-dom";
import styles from './Dashboard.module.scss';

type Props = {};

const Dashboard: React.FC<Props> = (props) => {
  return (
    <div>
    <h1>Dashboard Page</h1>
      <p><Link to="/search">Search Page Link</Link></p>
      <p><Link to="/detail">Detail Page Link</Link></p>
    </div>
  );
}

export default Dashboard;
