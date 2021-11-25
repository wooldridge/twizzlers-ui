import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox";
import Menus from "../../components/Menus/Menus";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { configHeader } from "../../config/header.js";
import { ArrowUpRightSquare, PersonCircle } from "react-bootstrap-icons";
import styles from "./Header.module.scss";

type Props = {};

const Header: React.FC<Props> = (props) => {

  const handleSelect = () => (e) => {
    console.log("handleSelect", e);
  }

  let menus = configHeader.menus.map((menu, index) => {
    return (
      <>
        <span className={styles.menu} key={"menu-" + index}>
          {menu.to ?
            <Link to={menu.to}>{menu.label}</Link> :
            menu.url ?
              <a href={menu.url} target="_blank" rel="noreferrer">{menu.label}</a> :
              <Nav activeKey="1" onSelect={handleSelect()}>
                <NavDropdown title="Dropdown" id="nav-dropdown">
                  {menu.submenu?.map((sb, i) => {
                    if (sb.url) {
                      return (
                        <NavDropdown.Item href={sb.url}>{sb.label}</NavDropdown.Item>
                      )
                    } else {
                      return (
                        <NavDropdown.Item eventKey={sb.to}>{sb.label}</NavDropdown.Item>
                      )
                    }
                  })}
                </NavDropdown>
              </Nav>
          }
        </span>
      </>
    );
  });

  return (
    <header className="sticky-top">
      <div>
        <span className={styles.logo}>
          <ArrowUpRightSquare color="#ccc" size={24} />
        </span>
        <span className={styles.title}>
          <Link to="/">{configHeader.title}</Link>
        </span>
        <Menus config={configHeader.menus} />
        <SearchBox width="600px" />
      </div>
      <div className={styles.account}>
        <PersonCircle color="#ccc" size={28} />
      </div>
    </header>
  );

};

export default Header;
