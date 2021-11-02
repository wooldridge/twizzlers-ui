import React from 'react';
import { Link } from "react-router-dom";
import { ArrowUpRightSquare, PersonCircle } from 'react-bootstrap-icons';
import styles from './Header.module.scss';
import { config } from "../../config/config.js";

type Props = {
    config?: any
};

const Header: React.FC<Props> = (props) => {

    let menus = config.menus.map((menu, index) => {
        return (
            <span className={styles.menu} key={"menu-" + index}>
                {menu.to ? 
                    <Link to={menu.to}>{menu.label}</Link> :
                    <a href={menu.url} target="_blank">{menu.label}</a>
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
                    <Link to="/">{config.title}</Link>
                </span>
                {menus}
            </div>
            <div className={styles.account}>
                <PersonCircle color="#ccc" size={28} />
            </div>
        </header>
    );
    
}

export default Header;
