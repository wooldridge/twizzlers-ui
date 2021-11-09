import React from 'react';
import Metric from './Metric';
import styles from './Metrics.module.scss';
import _ from 'lodash';

type Props = {
  data?: any;
  config?: any
};

const Metrics: React.FC<Props> = (props) => {

  return (
    <div className={styles.metrics}>
        {_.isArray(props.config) && props.config.map((m, i) => {
            return (
                <Metric key={"metric-" + i} data={props.data.metrics} config={m} />
            )
        })}
    </div>
  );
}

export default Metrics;
