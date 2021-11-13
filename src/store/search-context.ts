import React from "react";

interface SearchContextInterface {
    searchResults: any;
    handleSearch: any;
}

const SearchContext = React.createContext<SearchContextInterface>({
  searchResults: {},
  handleSearch: () => {}
});

export default SearchContext;
