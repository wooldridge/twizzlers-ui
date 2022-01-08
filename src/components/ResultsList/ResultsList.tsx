import React, { useContext } from "react";
import Address from "../Address/Address";
import { SearchContext } from "../../store/SearchContext";
import { DetailContext } from "../../store/DetailContext";
import {GearFill, CodeSlash, ArrowRepeat} from "react-bootstrap-icons";
import "./ResultsList.scss";
import {colors} from "../../config/colors";
import _ from "lodash";

type Props = {
  config?: any;
};

const COMPONENTS = {
  Address: Address
}

/**
 * Component for showing search results in list format.
 * Data payload provided by {@link SearchContext}.
 *
 * @component
 * @prop {object} config  Configuration object.
 * @prop {string} config.id  Path to ID. Passed as identifier to Detail view. 
 * @prop {object} config.thumbnail  Thumbnail configuration object.
 * @prop {string} config.thumbnail.src  Path to thumbnail source URL.
 * @prop {string} config.thumbnail.width  Thumbnail width (in pixels).
 * @prop {string} config.thumbnail.height  Thumbnail height (in pixels).
 * @prop {string} config.title  Path to title associated with record. Clicking title in UI takes you to 
 * Detail view for that result.
 * @prop {object[]} config.items  Array of item configuration objects. Item can be value-based or component-based.
 * @prop {string} config.items.value  Path to value-based item.
 * @prop {string} config.items.className  CSS class name to apply to item value.
 * @prop {string} config.items.component  Name of component used to render component-based item.
 * @prop {object} config.items.config  Object of configuration properties for item component.
 * @prop {string} config.categories  Path to categories associated with record.
 * @prop {object} config.timestamp  Timestamp configuration object.
 * @prop {string} config.timestamp.value  Path to timestamp.
 * @prop {string} config.timestamp.label  Label prefix for timestamp.
 * @prop {string} config.status  Path to status associated with record.
 * @example
 * // Configuration
 * const searchResultsConfig = { 
 *   id: "extracted.person.id",
 *   thumbnail: {
 *       src: "extracted.person.image",
 *       width: 100,
 *       height: 100
 *   },
 *   title: "extracted.person.name",
 *   items: [
 *       // One component-based item
 *       {
 *          component: "Address", 
 *          config: {
 *            city: "extracted.person.address.city",
 *            state: "extracted.person.address.state"
 *          }
 *       },
 *       // Two value-based items
 *       {value: "extracted.person.phone", className: "phone"},
 *       {value: "extracted.person.ssn"}
 *   ],
 *   categories: "extracted.person.sources",
 *   timestamp: {
 *       value: "extracted.person.createdOn",
 *       label: "Time is"
 *   },
 *   status: "extracted.person.status"
 * }
 * @example
 * // JSX
 * <ResultsList config={searchResultsConfig} />
 */
const ResultsList: React.FC<Props> = (props) => {

  const searchContext = useContext(SearchContext);
  const detailContext = useContext(DetailContext);

  const handleNameClick = (e) => {
    detailContext.handleDetail(e.target.id);
  };

  // TODO different than displayValue?
  const getValue = (key, results) => {
    let val = _.get(results, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const getArrayValue = (key, results) => {
    let val = _.get(results, key);
    return Array.isArray(val) ? val : [val];
  };

  const displayValue = (key, results) => {
    let val = _.get(results, key);
    return _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
  };

  const displayDate = (key, results) => {
    let val = _.get(results, key);
    val = _.isNil(val) ? null : (Array.isArray(val) ? val[0] : val);
    let parts = val.split("T");
    return _.isNil(parts[0]) ? null : parts[0];
  };

  const getResults = () => {
    let results = searchContext.searchResults.result.map((results, index) => {
      let items = props.config.items && props.config.items.map((it, index) => {
        if (it.component) {
          return (
            <div key={"item-" + index} className="item">
              {React.createElement(
                COMPONENTS[it.component], 
                { config: it.config, data: results, styles: it.styles }, null
              )}
            </div>
          );
        } else {
          return (
            <div key={"item-" + index} className="item">
              <span className={it.className} style={it.style ? it.style : null} title={displayValue(it.value, results)}>
                {displayValue(it.value, results)}
              </span>
            </div>
          )
        }
      });
      return (
        <div key={"result-" + index} className="result">
          <div className="thumbnail">
            {props.config.thumbnail ? 
            <img
              src={getValue(props.config.thumbnail.src, results)}
              alt={getValue(props.config.title, results)}
            ></img> : null}
          </div>
          <div className="details">
            <div className="title" id={getValue(props.config.id, results)} onClick={handleNameClick}>
              {displayValue(props.config.title, results)}
            </div>
            <div className="subtitle">
              {items}
            </div>
            {props.config.categories ? 
            <div className="categories">
              {getArrayValue(props.config.categories, results).map((s, index2) => {
                return (
                  <div key={"category-" + index2} style={{backgroundColor: colors.sourceColors[s]}}>{s}</div>
                )
              })}
            </div> : null}
          </div>
          <div className="actions">
            {props.config.timestamp ? 
            <div className="timestamp">
              {props.config.timestamp.label} {displayDate(props.config.timestamp.value, results)}
            </div> : null}
            <div className="icons">
              {props.config.status ? 
              <div className="status">
                {displayValue(props.config.status, results)}
              </div> : null}
              {/* <GearFill color="#5d6aaa" size={16} />
              <CodeSlash color="#5d6aaa" size={16} />
              <ArrowRepeat color="#5d6aaa" size={16} /> */}
            </div>
          </div>
        </div>
      );
    });
    return results;
  };

  return (
    <div className="resultsList">
      {(searchContext.searchResults?.result?.length) > 0 ? (
        <div>{getResults()}</div>
      ) : <div className="noResults">No results</div>
      }
    </div>
  );
};

export default ResultsList;
