import React, { useContext } from "react";
import { SearchContext } from "../../store/SearchContext";
import Form from "react-bootstrap/Form";
import styles from "./Facets.module.scss";
import "./Facets.scss";

type Props = {
    config?: any;
};

/**
 * Component for showing selectable search facets.
 * Searches are executed by {@link SearchContext}.
 *
 * @component
 * @prop {object[]} config  Data table configuration object.
 * @prop {string} config[].type - Facet type (e.g., "category").
 * @prop {string} config[].value - Facet value.
 * @prop {boolean} config[].disabled - Is the facet disabled (optional, default to false).
 * @example
 * [
 *   {
 *     type: "category",
 *     value: "Widgets"
 *   },
 *   {
 *     type: "category",
 *     value: "Other Stuff",
 *     disabled: true
 *   }
 * ]
 */
const Facets: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);

  const handleSelect = (e) => {
    let parts = e.target.id.split(":");
    searchContext.handleFacetString(parts[0], parts[1], e.target.checked);
  };

  const getFacetValues = (facet, facetValues, disabled=false) => {
    let result = facetValues.map((fv, index) => {
      return (
        <li key={"facetValue-" + index}>
          <Form.Check 
            type={"checkbox"}
            checked={searchContext.facetStrings.includes(facet + ":" + fv.name)}
            disabled={disabled ? disabled : false}
            id={facet + ":" + fv.name}
            label={fv.name}
            className="shadow-none"
            onChange={handleSelect}
          />
          <div className={styles.count}>{fv.count.toLocaleString()}</div>
        </li>
      )
    });
    return <div>{result}</div>
  }

  return (
    <div className={styles.facets}>
      {/* Show each facet */}
      {props.config && props.config.map((f, index) => {
        return ( 
        <div key={"facet-" + index}>
          <div className={styles.title}>{f.value}</div>
          <ul className={styles.values}>
            {/* Show each facet value (and count) */}
            {searchContext.searchResults.facets && searchContext.searchResults.facets[f.value] !== undefined ?
              getFacetValues(f.value, searchContext.searchResults.facets[f.value].facetValues, f.disabled) :
              null
            }
          </ul>
      </div> ) 
    })}
    </div> 
  );

};

export default Facets;
