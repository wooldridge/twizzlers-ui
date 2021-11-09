// import axios from "axios";
import { searchResults } from "../mocks/search";
import { summary } from "../mocks/summary";
import { history } from "../mocks/history";

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

// export const getHistory = async (opts) => { // TODO
export const getHistory = (opts) => {
  // return await axios.get(`/api/history`); // TODO
  console.log("getHistory", opts, history);
  return history;
};