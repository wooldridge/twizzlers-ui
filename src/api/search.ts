// import axios from "axios";
import {searchResults} from "../mocks/results";
import {summary} from "../mocks/summary";
import {saved} from "../mocks/saved";
import {details} from "../mocks/details";

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

// export const getSaved = async (opts) => { // TODO
export const getSaved = (opts) => {
  // return await axios.get(`/api/saved`); // TODO
  console.log("getSaved", opts, saved);
  return saved;
};

// export const getDetail = async (opts) => { // TODO
export const getDetail = (opts) => {
  // return await axios.get(`/api/saved`); // TODO
  console.log("getDetail", opts, details);
  return details[opts];
};