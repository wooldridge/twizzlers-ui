import React, { useState, useContext, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import { SearchContext } from "../../store/SearchContext";
import { Search } from "react-bootstrap-icons";
import "./SearchBox.scss";

type Props = {
    config?: any;
    button?: string;
    buttonAlign?: string;
    width?: string;
};

/**
 * Component for showing search input box. Includes record type dropdown menu and optional submit button.
 * Searches are executed by {@link SearchContext}.
 *
 * @component
 * @prop {object} config - Configuration object.
 * @prop {object[]} config.items - Array of menu item objects.
 * @prop {string} config.items.label - Menu item label.
 * @prop {string|string[]} config.items.value - Menu item value (as string or array of strings).
 * @prop {string} button - Whether to display a submit button ("true" or "false"). Default is "false".
 * @prop {string} buttonAlign - Button alignment ("vertical" or "horizontal"). Default is "horizontal".
 * @prop {string} width - Width of search box (as CSS width value). Default is "100%".
 * @example
 * <SearchBox width="80%" />
 */
const SearchBox: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);

  let qtextInit = searchContext.qtext || "";
  let selectedInit: string = "";

  let items: any = [];
  if (props.config && props.config.items && props.config.items.length > 0) {
    items = props.config.items;
    let found = items.find(item => item.default === true);
    selectedInit = found ? found.label : items[0].label;
  }

  const [selected, setSelected] = useState<any>(selectedInit);
  const [qtext, setQtext] = useState<any>(qtextInit);

  useEffect(() => {
    setQtext(searchContext.qtext);
  }, [searchContext.qtext]);

  useEffect(() => {
    let found = items.find(item => item.value === searchContext.entityType);
    if (found && found.label) {
      setSelected(found.label);
    } else {
      setSelected(selectedInit);
    }
  }, [searchContext.entityType]);

  const handleSelect = (e) => {
    setSelected(e);
  };

  // Get entity value ("person") for a selected menu label ("Person")
  const getEntityVal = selected => {
    let found = items.find(item => item.label === selected);
    return found ? found.value : "";
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      searchContext.handleSearch(qtext, getEntityVal(selected));
    }
  };

  const handleButton = (e) => {    
    searchContext.handleSearch(qtext, getEntityVal(selected));
  };

  const handleChange = (e) => {
    setQtext(e.target.value);
  };

  const searchBoxStyle = {
    width: props.width ? props.width : "100%"
  };

  let menuItems = items.map((item, i) => {
    return (
      <Dropdown.Item 
        key={"item-" + i} 
        eventKey={item.label}
        active={item.active}
      >{item.label}</Dropdown.Item>
    );
  });

  return (
    <div className="searchBox" style={searchBoxStyle}>
      <InputGroup>
        { items.length > 0 &&
        <DropdownButton
          variant="outline-secondary"
          title={selected}
          id="searchBoxDropdown"
          onSelect={handleSelect}
        >
          {menuItems}
        </DropdownButton> }
        <FormControl
          className="shadow-none"
          value={qtext}
          onKeyDown={(e) => handleEnter(e) }
          onChange={handleChange}
        />
        { props.button !== "true" && 
          <Search color="#999" size={18} className="searchIcon" />
        }
        { props.button === "true" && 
          <div className={props.buttonAlign ? props.buttonAlign : "horizontal"}>
            <button className="submit" onClick={handleButton}>Search</button>
          </div>
        }
      </InputGroup>
    </div>
  );

};

export default SearchBox;
