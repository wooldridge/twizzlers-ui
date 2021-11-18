import React, { useContext } from "react";
import { SearchContext } from "../../store/SearchContext";
import Form from "react-bootstrap/Form";
import styles from "./Facets.module.scss";
import "./Facets.scss";

type Props = {
    config?: any;
};

const Facets: React.FC<Props> = (props) => {

  const ctx = useContext(SearchContext);

  const handleSelect = (e) => {
    console.log("handleSelect", e);
    ctx.handleFacets(e.target.id, e.target.checked);
  };

  const getFacetValues = (facet, facetValues) => {
    let res = facetValues.map((fv, index) => {
      return (
        <li key={"facetValue-" + index}>
          <Form.Check 
            type={"checkbox"}
            checked={ctx.facets.includes(facet + ":" + fv.name)}
            id={facet + ":" + fv.name}
            label={fv.name}
            className="shadow-none"
            onChange={handleSelect}
          />
          <div className={styles.count}>{fv.count.toLocaleString()}</div>
        </li>
      )
    });
    return <div>{res}</div>
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
            {ctx.searchResults.facets && ctx.searchResults.facets[f.value] !== undefined ?
              getFacetValues(f.value, ctx.searchResults.facets[f.value].facetValues) :
              null
            }
          </ul>
      </div> ) 
    })}
    </div> 
  );

};

export default Facets;
