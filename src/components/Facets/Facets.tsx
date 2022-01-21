import React, { useContext, useState } from "react";
import { SearchContext } from "../../store/SearchContext";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {InfoCircleFill, ChevronDoubleRight, ChevronDoubleLeft} from "react-bootstrap-icons";
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

  let moreLessInit = {};
  const moreLessDefault = true;
  if (props.config.items) {
    props.config.items.forEach(f => {moreLessInit[f.value] = moreLessDefault;});
  }

  const [moreLess, setMoreLess] = useState<any>(moreLessInit);

  // Set up thresholds for more/less links
  const displayThreshold = props.config.displayThreshold || 5;
  let moreThreshold;
  if (props.config.items && props.config.items.length > displayThreshold) {
    moreThreshold = props.config.displayShort || 5;
  } else {
    moreThreshold = props.config.displayLong || 10;
  }

  const handleSelect = (e) => {
    let parts = e.target.id.split(":");
    searchContext.handleFacetString(parts[0], parts[1], e.target.checked);
  };

  const handleMoreLess = (value) => () => {
    setMoreLess(prevState => {
      let newState = Object.assign({}, prevState);
      newState[value] = !prevState[value];              
      return newState;
    })
  }

  const displayFacetValues = (facetObj, disabled=false, moreLess) => {
    let total = 2000000;
    let result = facetObj["facet-value"] ? 
      facetObj["facet-value"].map((fv, index) => {
        let value = Math.floor(Math.random() * (total + 1));
        if (!(moreLess && index >= moreThreshold)) {
          return (
            <tr className="facetValue" key={"facetValue-" + index}>
              <td className="label">
                <Form.Check 
                  type={"checkbox"}
                  checked={searchContext.facetStrings && searchContext.facetStrings.includes(facetObj.name + ":" + fv.name)}
                  disabled={disabled ? disabled : false}
                  id={facetObj.name + ":" + fv.name}
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
                        //width: (fv.count*100/searchContext.total).toString().concat("%"),
                        width: (value*100/total).toString().concat("%"),
                        backgroundColor: (searchContext.facetStrings && searchContext.facetStrings.includes(facetObj.name + ":" + fv.name)) ? 
                          props.config.selected : props.config.unselected
                      }}
                  ></div>
                </div>
              </td>
              {/* <td className="count">{(fv.count).toLocaleString()}</td> */}
              <td className="count">{(value).toLocaleString()}</td>
            </tr>
          )
        }
      }) : null;
    return <div>{result}</div>
  }

  const getTooltip = (content) => {
    return <Tooltip>{content}</Tooltip>
  }

  // Get object for a facet based on facet name
  const getFacetObj = (facetName, facetObjs) => {
    return facetObjs ? facetObjs.find(obj => obj.name === facetName) : null;
  }

  // Get number of facet values for a facet based on facet name
  const getNumValues = (facetName, facetObjs) => {
    let facetObj = getFacetObj(facetName, facetObjs);
    return (facetObj && facetObj["facet-value"]) ? facetObj["facet-value"].length : 0;
  }

  return (
    <div className="facets">
      {/* Show each facet */}
      {props.config.items && props.config.items.map((f, index) => {
        return ( 
        <div className="facet" key={"facet-" + index}>
          <div className="title">
            {f.value}
            <OverlayTrigger
              key={f.value}
              placement="right"
              overlay={getTooltip(f.tooltip)}
            >
              <InfoCircleFill 
                data-testid="infoCircle"
                color="#5d6aaa" 
                size={21}
                className="facetInfo" 
              />
            </OverlayTrigger>
          </div>
          <div className="facetValues">
            {/* Show each facet value (and count) */}
            {searchContext.searchResults?.facet && searchContext.searchResults.facet?.length > 0 ?
            <Table size="sm" style={{padding: 0, margin: 0}}>
              <tbody>
                  {displayFacetValues(getFacetObj(f.value, searchContext.searchResults.facet), f.disabled, moreLess[f.value])}
              </tbody>
            </Table> : null }
            {(getNumValues(f.value, searchContext.searchResults.facet) > moreThreshold) ? moreLess[f.value] ? 
              <div className="moreLess" onClick={handleMoreLess(f.value)}>
                {getNumValues(f.value, searchContext.searchResults.facet) - moreThreshold} more
                <ChevronDoubleRight 
                  data-testid="doubleRight"
                  color="#5d6aaa" 
                  size={11}
                  className="doubleRight" 
                /></div> :
              <div className="moreLess" onClick={handleMoreLess(f.value)}>
                <ChevronDoubleLeft 
                  data-testid="doubleLeft"
                  color="#5d6aaa" 
                  size={11}
                  className="doubleLeft" 
                />less</div> : null
            }
          </div>
      </div> ) 
    })}
    </div> 
  );
};

export default Facets;
