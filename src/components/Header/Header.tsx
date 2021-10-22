import React from 'react';
import { Link } from "react-router-dom";
import { app } from "../../config/app";
import { ArrowUpRightSquare, PersonCircle } from 'react-bootstrap-icons';
import styles from './Header.module.scss';

type Props = {};

const Header: React.FC<Props> = (props) => {
  return (
    <header>
        <div>
            <span className={styles.logo}>
                <ArrowUpRightSquare color="#ccc" size={24} />
            </span>
            <span className={styles.title}>
                <Link to="/">{app.title}</Link>
            </span>
        </div>
        <div className={styles.account}>
            <PersonCircle color="#ccc" size={28} />
        </div>
    </header>
  );
}

export default Header;
