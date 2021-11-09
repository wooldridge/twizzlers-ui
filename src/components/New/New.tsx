import React from 'react';
import styles from './New.module.scss';

type Props = {
  data?: any;
  config?: any
};

const New: React.FC<Props> = (props) => {

  return (
    <div className={styles.new}>
        What's New content...
    </div>
  );
}

export default New;
