// import axios from "axios";
import persons from "../mocks/persons.json";
import {searchResults} from "../mocks/results";
import {summary} from "../mocks/summary";
import {saved} from "../mocks/saved";
import {detail} from "../mocks/detail";
import _ from "lodash";

// export const getSearchResults = async (query) => { // TODO
export const getSearchResults = (query) => {
  // return await axios.get(`/api/searchResults`); // TODO
  console.log("getSearchResults", query);
  const results = _.clone(searchResults);
  results["start"] = query.start;
  results["pageLength"] = query.pageLength;
  let personsSlice = persons.slice((query.start - 1), (query.start + query.pageLength -1));
  let fsKeys = Object.keys(query.facetStrings);
  let newArr;
  // TODO Fake faceted search for now...
  fsKeys.forEach(key => {
    if (key === "Status") {
      newArr = personsSlice.filter(p => {
        return query.facetStrings[key].includes(p.entityInstance.status);
      })
      personsSlice = newArr;
    }
    if (key === "Sources") {
      newArr = personsSlice.filter(p => {
        let intersected = _.intersection(query.facetStrings[key], p.entityInstance.sources);
        return intersected.length > 0;
      })
      personsSlice = newArr;
    }
  });
  results["results"] = personsSlice;
  results["returned"] = personsSlice.length;
  results["total"] = persons.length;
  return results;
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
  const result = _.clone(detail);
  const person = persons.find(p => p.entityInstance.personId === parseInt(opts));
  if (person !== undefined) {
    result["docUri"] = person["uri"];
    result["entityInstanceProperties"] = person.entityInstance;
  }
  return result;
};