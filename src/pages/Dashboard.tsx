import React, {useState, useEffect} from "react";
import New from '../components/New/New';
import Metrics from '../components/Metrics/Metrics';
import Saved from '../components/Saved/Saved';
import Section from '../components/Section/Section';
import SearchBox from '../components/SearchBox/SearchBox';
import Recent from '../components/Recent/Recent';
import { configDashboard } from "../config/dashboard.js";
import { getSummary } from '../api/search';
import { getHistory } from '../api/search';
import styles from './Dashboard.module.scss';

type Props = {
  data?: any;
  config?: any;
  handleSearch: any;
};

const Dashboard: React.FC<Props> = (props) => {

  const [summary, setSummary] = useState<any>({});
  const [hist, setHist] = useState<any>({});

  useEffect(() => {
    setSummary(getSummary({}));
    setHist(getHistory({}));
  }, []);

  return (
    <div className="container-fluid">

      {/* METRICS ROW */}
      <div className="row">

        <Metrics data={summary.metrics} config={configDashboard.metrics} />

      </div>

       {/* MAIN CONTENT */}
      <div className="row">

        {/* LEFT COLUMN */}
        <div className="col-lg">

          <Section title="Search">
            <div className={styles.newSearch}>
              <h4>New Search</h4>
              <SearchBox width="100%" handleSearch={props.handleSearch} />
            </div>
            <div className={styles.divider}>- or -</div>
            <div className={styles.savedSearches}>
              <h4>Saved Searches</h4>
              <Saved data={hist.saved} config={configDashboard.saved} />
            </div>
          </Section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg">

          <Section title="What's New with Entities">
            <New />
          </Section>
          <Section title="Recently Visited">
            <Recent />
          </Section>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
