import axios from "axios";
import { searchResults } from "../mocks/search";

// export const getSearchResults = async (query) => { // TODO
export const getSearchResults = (query) => {
  // return await axios.get(`/api/searchResults`); // TODO
  console.log("getSearchResults", query, searchResults);
  return searchResults;
};