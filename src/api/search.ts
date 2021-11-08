// import axios from "axios";
import { searchResults } from "../mocks/search";
import { summary } from "../mocks/summary";

// export const getSearchResults = async (query) => { // TODO
export const getSearchResults = (query) => {
  // return await axios.get(`/api/searchResults`); // TODO
  console.log("getSearchResults", query, searchResults);
  return searchResults;
};

// export const getSummary = async (opts) => { // TODO
export const getSummary = (opts) => {
  // return await axios.get(`/api/summary`); // TODO
  console.log("getSummary", opts, summary);
  return summary;
};