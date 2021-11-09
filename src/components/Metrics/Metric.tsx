import React from 'react';
import styles from './Metric.module.scss';
import _ from 'lodash';

type Props = {
  data?: any;
  config?: any
};

const Metric: React.FC<Props> = (props) => {

  function display(key, res) {
    let val = _.get(res, key)
    return _.isNil(val) ? null : (_.isNumber(val) ? val.toLocaleString() : val)
  }

  return (
    <div className={styles.metric} style={{borderColor: props.config.color}}>
      <div className={styles.value}>{display(props.config.value, props.data)}</div>
      <div className={styles.title}>{props.config.title}</div>
    </div>
  );
}

export default Metric;
