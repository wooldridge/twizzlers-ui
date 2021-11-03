import React, {useState, useEffect} from "react";
import Metrics from '../components/Metrics/Metrics';
import { configDashboard } from "../config/dashboard.js";
import { getSummary } from '../api/search';
import styles from './Dashboard.module.scss';

type Props = {};

const Dashboard: React.FC<Props> = (props) => {

  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    setSummary(getSummary({}));
  });

  return (
      <div className={styles.dashboard}>
        <Metrics data={summary} config={configDashboard.metrics} />
      </div>
  );
}

export default Dashboard;
