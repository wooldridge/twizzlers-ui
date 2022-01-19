import React, { useState, useContext, useLayoutEffect, useEffect, useRef } from "react";
import { SearchContext } from "../../store/SearchContext";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
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
  const targetRef: any = useRef(null);
  const [valueWidth, setValueWidth] = useState<any>(null);

  const handleSelect = (e) => {
    let parts = e.target.id.split(":");
    searchContext.handleFacetString(parts[0], parts[1], e.target.checked);
  };

  const getFacetValues = (facet, facetObjects, disabled=false) => {
    let facetObj = facetObjects.find(obj => obj.name === facet);
    let total = 20000;
    let result = facetObj["facet-value"] ? 
      facetObj["facet-value"].map((fv, index) => {
        let random = Math.floor(Math.random() * (total + 1));
        return (
          <li key={"facetValue-" + index}>
            <div className={styles.label}>
              <Form.Check 
                type={"checkbox"}
                checked={searchContext.facetStrings && searchContext.facetStrings.includes(facet + ":" + fv.name)}
                disabled={disabled ? disabled : false}
                id={facet + ":" + fv.name}
                label={fv.name}
                title={fv.name}
                className="shadow-none"
                onChange={handleSelect}
              />
            </div>
            <div className="meterTotal">
              <div className="meterValue" 
                   style={{width: (random*100/total).toString().concat("%")}}
              ></div>
            </div>
            <div className={styles.count.concat(" facetCount")} style={{width: valueWidth}}>{(random).toLocaleString()}</div>
          </li>
        )
      }) : null;
    return <div>{result}</div>
  }

  useLayoutEffect(() => {
  //useEffect(() => {
    if (targetRef.current) {
      let vals = targetRef.current!.getElementsByClassName("facetCount");
      let maxWidth = 0;
      for (let i = 0; i < vals.length; i++) {
        maxWidth = vals[i].offsetWidth > maxWidth ? vals[i].offsetWidth : maxWidth;
      }
      // maxWidth = maxWidth + 50;
      setValueWidth(maxWidth.toString().concat("px"));
    }
  }, [searchContext.searchResults]);

  return (
    <div className={styles.facets} ref={targetRef}>
      {/* Show each facet */}
      {props.config && props.config.map((f, index) => {
        return ( 
        <div key={"facet-" + index}>
          <div className={styles.title}>{f.value}</div>
          <ul className={styles.values}>
            {/* Show each facet value (and count) */}
            {searchContext.searchResults?.facet && searchContext.searchResults.facet?.length > 0 ?
              getFacetValues(f.value, searchContext.searchResults.facet, f.disabled) :
              null
            }
          </ul>
      </div> ) 
    })}
    </div> 
  );

};

export default Facets;
