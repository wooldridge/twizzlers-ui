import React, { useContext } from "react";
import SearchContext from "../../store/search-context";
import Form from "react-bootstrap/Form";
import styles from "./Facets.module.scss";
import "./Facets.scss";

type Props = {
    config?: any;
};

const Facets: React.FC<Props> = (props) => {

  const ctx = useContext(SearchContext);

  const getFacetValues = (faceValues) => {
    let res = faceValues.map((fv, index) => {
      return (
        <li key={"facetValue-" + index}>
          <Form.Check 
            type={"checkbox"}
            id={fv.name}
            label={fv.name}
            className="shadow-none"
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
              getFacetValues(ctx.searchResults.facets[f.value].facetValues) :
              null
            }
          </ul>
      </div> ) 
    })}
    </div> 
  );

};

export default Facets;
