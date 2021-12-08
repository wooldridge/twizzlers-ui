import React, { useState, useContext, useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import { SearchContext } from "../../store/SearchContext";
import styles from "./SearchBox.module.scss";
import "./SearchBox.scss";

type Props = {
    width?: string;
};

/**
 * Component for showing search input box. Includes record type dropdown menu.
 * Searches are executed by {@link SearchContext}.
 *
 * @component
 * @prop {object} width - Width of search box (CSS width value, defaults to "100%").
 * @example
 * <SearchBox width="80%" />
 */
const SearchBox: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);

  let qtextInit = searchContext.qtext || "";

  const [selected, setSelected] = useState<string>("Person");
  const [qtext, setQtext] = useState<any>(qtextInit);

  // TODO retrieve entities from search results
  let entities = ["Person", "Place", "Thing"];
  let items = entities.map((e, i) => {
    return (
      <Dropdown.Item key={"item-" + i} eventKey={e}>{e}</Dropdown.Item>
    );
  });

  useEffect(() => {
    setQtext(searchContext.qtext);
  }, [searchContext.qtext]);

  const handleSelect = (e) => {
    setSelected(e);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      searchContext.handleSearch(qtext);
    }
  };

  const handleChange = (e) => {
    setQtext(e.target.value);
  };

  const searchBoxStyle = {
    width: props.width ? props.width : "100%"
  };

  return (
    <div className={styles.searchBox} style={searchBoxStyle}>
      <InputGroup>
        <DropdownButton
          variant="outline-secondary"
          title={selected}
          id="searchBoxDropdown"
          onSelect={handleSelect}
        >
          {items}
        </DropdownButton>
        <FormControl
          className="shadow-none"
          value={qtext}
          onKeyDown={(e) => handleSubmit(e) }
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );

};

export default SearchBox;
