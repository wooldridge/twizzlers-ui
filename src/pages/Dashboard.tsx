import React, {useState, useEffect} from "react";
import New from '../components/New/New';
import Metrics from '../components/Metrics/Metrics';
import Section from '../components/Section/Section';
import Search from '../components/Search/Search';
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

      <div className="row">

        <Metrics data={summary.metrics} config={configDashboard.metrics} />

      </div>

      <div className="row">

        <div className="col-lg">

          <Section title="Search">
            <Search data={hist} config={configDashboard} handleSearch={props.handleSearch} />
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
  );
}

export default Dashboard;
