import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchResults } from "../api/api";

interface SearchContextInterface {
  qtext: string;
  facetStrings: string[];
  searchResults: any;
  returned: number;
  total: number;
  handleSearch: any;
  handleFacetString: any;
  handleSaved: any;
}
interface QueryInterface {
  start: number;
  pageLength: number;
  qtext: string;
  facetStrings: {
    name: string;
    values: string[];
  }[];
}
  
const defaultState = {
  qtext: "",
  facetStrings: [],
  searchResults: {},
  returned: 0,
  total: 0,
  handleSearch: () => {},
  handleFacetString: () => {},
  handleSaved: () => {}
};

/**
 * Component for storing state of search query and search results. 
 * Also provides methods for executing searches.
 * Made available to components that perform searches or display search results.
 *
 * @component
 * @prop {string} qtext - Search query text (e.g., from SearchBox).
 * @prop {string[]} facetStrings  Array of facet selections (["Widget:Foo", "Widget:Bar"]).
 * @prop {object} searchResults - Search results object.
 * @prop {number} returned - Number of records returned in search results.
 * @prop {number} total - Total number of records available.
 * @prop {HandleSearch} handleSearch - Callback to execute a search via query text (TODO document interface). 
 * @prop {HandleFacetString} handleFacetString - Callback to execute a search via facet selection (TODO document interface). 
 * @prop {HandleSaved} handleSaved - Callback to execute a search via selection of a saved query (TODO document interface). 
 * @example
 * TBD
 */
export const SearchContext = React.createContext<SearchContextInterface>(defaultState);

const SearchProvider: React.FC = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const startInit = 1;
  const pageLengthInit = 100;

  const [start, setStart] = useState<number>(startInit);
  const [pageLength, setPagePength] = useState<number>(pageLengthInit);
  const [returned, setReturned] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [qtext, setQtext] = useState<string>("");
  const [facetStrings, setFacetStrings] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const [newSearch, setNewSearch] = useState<boolean>(false);

  const buildQuery = (start, pageLength):QueryInterface => {
    let query = {
      start: start,
      pageLength: pageLength,
      qtext: qtext,
      facetStrings: []
    };
    facetStrings.forEach(fs => {
      let parts = fs.split(":");
      if (query.facetStrings[parts[0]]) {
        query.facetStrings[parts[0]].push(parts[1]);
      } else {
        query.facetStrings[parts[0]] = [parts[1]];
      }
    });
    return query;
  };

  useEffect(() => {
    if (newSearch) {
      let sr = getSearchResults(buildQuery(startInit, pageLengthInit));
      setSearchResults(sr);
      setReturned(sr.returned);
      setTotal(sr.total);
    }
    setNewSearch(false);
  }, [newSearch]);

  const handleSearch = (qtext) => {
    if (location.pathname !== "/search") {
      navigate("/search"); // Handle search submit from another view
    }
    setQtext(qtext);
    setNewSearch(true);
  };

  const handleFacetString = (name, value, selected) => {
    if (selected) {
      let newFacetString = name + ":" + value;
      setFacetStrings(prevState => [...prevState, newFacetString]);
    } else {
      let newFacetStrings = facetStrings.filter(f => (f !== (name + ":" + value)));
      setFacetStrings(newFacetStrings);
    }
    setNewSearch(true);
  };

  const handleSaved = (opts) => {
    console.log("handleSaved", opts);
    setQtext(opts.qtext);
    setFacetStrings(opts.facetStrings);
    if (location.pathname !== "/search") {
      navigate("/search"); // Handle search submit from another view
    }
    setNewSearch(true);
  };

  return (
    <SearchContext.Provider
      value={{
        qtext,
        facetStrings,
        searchResults,
        returned,
        total,
        handleSearch,
        handleFacetString,
        handleSaved
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;