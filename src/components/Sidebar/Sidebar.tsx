import React from 'react';
import styles from './Sidebar.module.scss';

type Props = {
  data?: any;
  config?: any;
};

const Sidebar: React.FC<Props> = (props) => {
  return (
    <div className={styles.sidebar}></div>
  );
}

export default Sidebar;
