import React, { useContext } from "react";
import { SearchContext } from "../../store/SearchContext";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
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

  const getFacetValues = (facet, facetObjects, disabled=false) => {
    let facetObj = facetObjects.find(obj => obj.name === facet);
    let total = 2000000;
    let result = facetObj["facet-value"] ? 
      facetObj["facet-value"].map((fv, index) => {
        //let value = Math.floor(Math.random() * (total + 1));
        return (
          <tr key={"facetValue-" + index}>
            <td className="label">
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
            </td>
            <td className="meter">
              <div className="total">
                <div className="count" 
                    style={{
                      width: (fv.count*100/searchContext.total).toString().concat("%"),
                      backgroundColor: (searchContext.facetStrings && searchContext.facetStrings.includes(facet + ":" + fv.name)) ? 
                        props.config.selected : props.config.unselected
                    }}
                ></div>
              </div>
            </td>
            <td className="count">{(fv.count).toLocaleString()}</td>
          </tr>
        )
      }) : null;
    return <div>{result}</div>
  }

  return (
    <div className="facets">
      {/* Show each facet */}
      {props.config.items && props.config.items.map((f, index) => {
        return ( 
        <div key={"facet-" + index}>
          <div className="title">{f.value}</div>
          <Table size="sm" style={{width: "300px", padding: "0"}}>
            <tbody>
              {/* Show each facet value (and count) */}
              {searchContext.searchResults?.facet && searchContext.searchResults.facet?.length > 0 ?
                getFacetValues(f.value, searchContext.searchResults.facet, f.disabled) :
                null
              }
            </tbody>
          </Table>
      </div> ) 
    })}
    </div> 
  );

};

export default Facets;
