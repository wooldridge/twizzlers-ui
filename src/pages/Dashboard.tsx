import React, {useState, useEffect} from "react";
import Metrics from '../components/Metrics/Metrics';
import Section from '../components/Section/Section';
import SearchBox from '../components/SearchBox/SearchBox';
import Saved from '../components/Saved/Saved';
import { configDashboard } from "../config/dashboard.js";
import { getSummary } from '../api/search';
import { getHistory } from '../api/search';
import styles from './Dashboard.module.scss';

type Props = {};

const Dashboard: React.FC<Props> = (props) => {

  const [summary, setSummary] = useState<any>({});
  const [hist, setHist] = useState<any>({});

  useEffect(() => {
    setSummary(getSummary({}));
    setHist(getHistory({}));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Metrics data={summary} config={configDashboard.metrics} />
      </div>
      <div className="row">
        <div className="col-lg">
          <Section title="Search">
            <div className={styles.newSearch}>
              <h4>New Search</h4>
              <SearchBox width="100%" />
            </div>
            <div className={styles.divider}>- or -</div>
            <div className={styles.savedSearches}>
              <h4>Saved Searches</h4>
              <Saved data={hist.saved} config={configDashboard.saved} />
            </div>
          </Section>
        </div>
        <div className="col-lg">
          <Section title="What's New with Entities">
            <div className={styles.whatsNew}>
              What's New content...
            </div>
          </Section>
          <Section title="Recently Visited">
            <div className={styles.whatsNew}>
              Recently Visited content...
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
