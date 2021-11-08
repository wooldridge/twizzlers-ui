import React, {useState, useEffect} from "react";
import Metrics from '../components/Metrics/Metrics';
import Section from '../components/Section/Section';
import SearchBox from '../components/SearchBox/SearchBox';
import { configDashboard } from "../config/dashboard.js";
import { getSummary } from '../api/search';
import styles from './Dashboard.module.scss';

type Props = {};

const Dashboard: React.FC<Props> = (props) => {

  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    setSummary(getSummary({}));
  }, []);

  return (
      <div className={styles.dashboard}>
        <Metrics data={summary} config={configDashboard.metrics} />
        <Section 
          title="Search"
          width="50%"
        >
          <div className={styles.newSearch}>
            <h4>New Search</h4>
            <SearchBox width="100%" />
          </div>
          <div className={styles.savedSearches}>
            <h4>Saved Searches</h4>
          </div>
        </Section>
      </div>
  );
}

export default Dashboard;
