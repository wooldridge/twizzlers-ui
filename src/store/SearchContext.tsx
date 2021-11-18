import React, { useEffect, useState, FC } from 'react';
import { useSearchParams } from "react-router-dom";
import { getSearchResults } from "../api/search";

interface SearchContextInterface {
    searchResults: any;
    handleSearch: any;
    handleFacets: any;
}
  
const defaultState = {
    searchResults: {},
    handleSearch: () => {},
    handleFacets: () => {}
};

export const SearchContext = React.createContext<SearchContextInterface>(defaultState);

const SearchProvider: React.FC = ({ children }) => {

  const [qtext, setQtext] = useState<any>("");
  const [facets, setFacets] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = {};
    if (qtext.trim() !== "") {
      params["qtext"] = qtext;
    }
    if (facets.length > 0) {
      params["facet"] = facets;
    }
    setSearchParams(params);
    setSearchResults(getSearchResults({}));
  }, [qtext, facets]);

  const handleSearch = (qtext) => {
    console.log("App handleSearch", qtext);
    setQtext(qtext);
  };

  const handleFacets = (facet, selected) => {
    console.log("App handleFacets", facet, selected);
    if (selected === false) {
      setFacets(facets.filter(f => f !== facet));
    } else {
      setFacets(prevArray => [...prevArray, facet]);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        handleSearch,
        handleFacets
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;