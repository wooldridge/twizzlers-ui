import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import SearchContext from "../../store/search-context";
import styles from "./SearchBox.module.scss";
import "./SearchBox.scss";

type Props = {
    data?: any;
    config?: any;
    width?: string;
};

const SearchBox: React.FC<Props> = (props) => {

  const history = useHistory();
  const ctx = useContext(SearchContext);

  const [selected, setSelected] = useState<string>("Person");
  const [qtext, setQtext] = useState<string>("");

  // TODO retrieve entities from search results
  let entities = ["Person", "Place", "Thing"];
  let items = entities.map((e, i) => {
    return (
      <Dropdown.Item key={"item-" + i} eventKey={e}>{e}</Dropdown.Item>
    );
  });

  const handleSelect = (e) => {
    setSelected(e);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && qtext !== "") {
      ctx.handleSearch({qtext: qtext});
      history.push("/search");
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
