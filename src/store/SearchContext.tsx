import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchResults } from "../api/search";

interface SearchContextInterface {
  qtext: string;
  facetStrings: string[];
  searchResults: any;
  handleSearch: any;
  handleFacetString: any;
}
interface QueryInterface {
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
  handleSearch: () => {},
  handleFacetString: () => {}
};

export const SearchContext = React.createContext<SearchContextInterface>(defaultState);

const SearchProvider: React.FC = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [qtext, setQtext] = useState<any>("");
  const [facetStrings, setFacetStrings] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const [newSearch, setNewSearch] = useState<boolean>(false);

  const buildQuery = ():QueryInterface => {
    let query = {
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
      setSearchResults(getSearchResults(buildQuery()));
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

  return (
    <SearchContext.Provider
      value={{
        qtext,
        facetStrings,
        searchResults,
        handleSearch,
        handleFacetString
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;