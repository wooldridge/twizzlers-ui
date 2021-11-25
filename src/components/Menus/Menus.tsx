import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Menus.module.scss";
import "./Menus.scss";

type Props = {
    config?: any;
};

const Menus: React.FC<Props> = (props) => {

    const navigate = useNavigate();

    const handleSelect = (to) => (e) => {
        console.log("handleSelect", e);
        navigate(to);
    }

    return (
        <div className={styles.menus}>
            {props.config.map((menu, index) => {
                return (
                    <span className={styles.menu} key={"menu-" + index}>
                        {menu.to ?
                            <Link to={menu.to}>{menu.label}</Link> :
                            menu.url ?
                            <a href={menu.url} target="_blank" rel="noreferrer">{menu.label}</a> :
                            <Nav activeKey="1">
                                <NavDropdown title={menu.label} id="nav-dropdown">
                                {menu.submenu?.map((sb, i) => {
                                    if (sb.url) {
                                    return (
                                        <NavDropdown.Item key={"menu-item-" + i} href={sb.url} target="_blank" rel="noreferrer">
                                            {sb.label}
                                        </NavDropdown.Item>
                                    )
                                    } else {
                                    return (
                                        <NavDropdown.Item key={"menu-item-" + i}>
                                            <span onClick={handleSelect(sb.to)}>{sb.label}</span>
                                        </NavDropdown.Item>
                                    )
                                    }
                                })}
                                </NavDropdown>
                            </Nav>
                        }
                    </span>
                );
            })}
        </div>
    );

};

export default Menus;
