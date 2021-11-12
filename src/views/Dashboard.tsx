import React, {useState, useEffect} from "react";
import New from '../components/New/New';
import Metrics from '../components/Metrics/Metrics';
import Section from '../components/Section/Section';
import Search from '../components/Search/Search';
import Recent from '../components/Recent/Recent';
import { configDashboard } from "../config/dashboard.js";
import { getSummary } from '../api/search';
import { getSaved } from '../api/search';
import styles from './Dashboard.module.scss';

type Props = {};

const Dashboard: React.FC<Props> = (props) => {

  const [summary, setSummary] = useState<any>({});
  const [saved, setSaved] = useState<any>({});

  useEffect(() => {
    setSummary(getSummary({}));
    setSaved(getSaved({}));
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className="dashboard container-fluid">

        <div className="row">

          <Metrics data={summary.metrics} config={configDashboard.metrics} />

        </div>

        <div className="row">

          <div className="col-lg">

            <Section title="Search">
              <Search data={saved} config={configDashboard} />
            </Section>

          </div>

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
    </div>
  );
}

export default Dashboard;
