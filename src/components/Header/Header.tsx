import React from 'react';
import { Link } from "react-router-dom";
import SearchBox from '../../components/SearchBox/SearchBox';
import { ArrowUpRightSquare, PersonCircle } from 'react-bootstrap-icons';
import { configHeader } from "../../config/header.js";
import styles from './Header.module.scss';

type Props = {};

const Header: React.FC<Props> = (props) => {

    let menus = configHeader.menus.map((menu, index) => {
        return (
            <span className={styles.menu} key={"menu-" + index}>
                {menu.to ? 
                    <Link to={menu.to}>{menu.label}</Link> :
                    <a href={menu.url} target="_blank" rel="noreferrer">{menu.label}</a>
                }
            </span>
        )
    });

    return (
        <header>
            <div>
                <span className={styles.logo}>
                    <ArrowUpRightSquare color="#ccc" size={24} />
                </span>
                <span className={styles.title}>
                    <Link to="/">{configHeader.title}</Link>
                </span>
                <span className={styles.menus}>
                    {menus}
                </span>
                <SearchBox width="600px" />
            </div>
            <div className={styles.account}>
                <PersonCircle color="#ccc" size={28} />
            </div>
        </header>
    );
    
}

export default Header;
