import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import styles from './SearchBox.module.scss';
import './SearchBox.scss';

type Props = {
    width?: string;
};

const SearchBox: React.FC<Props> = (props) => {

    const history = useHistory();

    const [selected, setSelected] = useState<string>("Person");
    const [qtext, setQtext] = useState<string>("");

    // TODO retrieve entities from search results
    let entities = ["Person", "Place", "Thing"];
    let items = entities.map(e => {
        return (
            <Dropdown.Item eventKey={e}>{e}</Dropdown.Item>
        )
    })

    const handleSelect = (e) => {
        setSelected(e);
    }
    
    const handleSubmit = (e) => {
        if (e.keyCode === 13 && qtext !== "") {
            history.push("/search");
        }
    }

    const handleChange = (e) => {
        setQtext(e.target.value);
    };

    const divStyle = {
        width: props.width ? props.width : "100%"
    }

    return (
        <div className={styles.searchBox} style={divStyle}>
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
    
}

export default SearchBox;
