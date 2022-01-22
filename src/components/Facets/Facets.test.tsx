import Facets from "./Facets";
import { SearchContext } from "../../store/SearchContext";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const configMultipleOver = {
    selected: "red",
    unselected: "green",
    displayThreshold: 2,
    displayShort: 2,
    displayLong: 3,
    items: [
        { type: "category", value: "a", tooltip: "a tip" },
        { type: "category", value: "b", tooltip: "b tip" },
        { type: "category", value: "c", tooltip: "c tip" }
    ]
};

const configMultipleUnder = Object.assign(
    {}, configMultipleOver, {displayThreshold: 4});

const searchResults = {
    "facet": [
        {
            "name": "a",
            "type": "xs:string",
            "facet-value": [
                {
                    "name": "A1",
                    "count": 1,
                    "_value": "A1"
                },
                {
                    "name": "A2",
                    "count": 2,
                    "_value": "A2"
                }
            ]
        },
        {
            "name": "b",
            "type": "xs:string",
            "facet-value": [
                {
                    "name": "B1",
                    "count": 1,
                    "_value": "B1"
                },
                {
                    "name": "B2",
                    "count": 2,
                    "_value": "B2"
                },
                {
                    "name": "B3",
                    "count": 3,
                    "_value": "B3"
                }
            ]
        },
        {
            "name": "c",
            "type": "xs:string",
            "facet-value": [
                {
                    "name": "C1",
                    "count": 9999,
                    "_value": "C1"
                }
            ]
        }
    ]
};

const searchContextValue = {
    qtext: "",
    entityType: "",
    facetStrings: ["c:C1"],
    searchResults: searchResults,
    returned: 0,
    total: 0,
    handleSearch: jest.fn(),
    handleFacetString: jest.fn(),
    handleSaved: jest.fn()
};

const searchResultsEmpty = {};

const searchContextValueEmpty = {
    qtext: "",
    entityType: "",
    facetStrings: [],
    searchResults: searchResultsEmpty,
    returned: 0,
    total: 0,
    handleSearch: jest.fn(),
    handleFacetString: jest.fn(),
    handleSaved: jest.fn()
};

describe("Facets component", () => {

    test("Verify facets render with clickable values when over threshold", () => {
        const {getByText, queryByText, getByTestId} = render(
            <SearchContext.Provider value={searchContextValue}>
                <Facets config={configMultipleOver} />
            </SearchContext.Provider>
        );
        searchContextValue.searchResults.facet.forEach((f) => {
            expect(getByText(f.name)).toBeInTheDocument();
        });
        expect(getByText("B2")).toBeInTheDocument();
        expect(queryByText("B3")).not.toBeInTheDocument();
        let cb1 = getByTestId("c:C1") as HTMLInputElement;
        expect(cb1).toBeChecked();
        expect(getByTestId("meter-c:C1")).toHaveStyle(`background-color: ${configMultipleOver.selected};`);
        let cb2 = getByTestId("b:B2") as HTMLInputElement;
        expect(cb2).not.toBeChecked();
        expect(getByTestId("meter-b:B2")).toHaveStyle(`background-color: ${configMultipleOver.unselected};`);
        userEvent.click(cb2);
        expect(searchContextValue.handleFacetString).toHaveBeenCalledWith("b", "B2", true);
        // Display more values
        userEvent.click(getByTestId("more-b"));
        expect(getByText("B3")).toBeInTheDocument();
        expect(getByTestId("less-b")).toBeInTheDocument();
        // Display less values
        userEvent.click(getByTestId("less-b"));
        expect(queryByText("B3")).not.toBeInTheDocument();
        expect(getByTestId("more-b")).toBeInTheDocument();
    });

    test("Verify facets render with values when under threshold", () => {
        const {getByText, queryByText} = render(
            <SearchContext.Provider value={searchContextValue}>
                <Facets config={configMultipleUnder} />
            </SearchContext.Provider>
        );
        searchContextValue.searchResults.facet.forEach((f) => {
            expect(getByText(f.name)).toBeInTheDocument();
        });
        expect(getByText("B2")).toBeInTheDocument();
        expect(getByText("B3")).toBeInTheDocument();
        expect(queryByText("more-b")).not.toBeInTheDocument();
        expect(queryByText("less-b")).not.toBeInTheDocument();
    });

    test("Verify facets render when no values are returned", () => {
        const {getByText} = render(
            <SearchContext.Provider value={searchContextValueEmpty}>
                <Facets config={configMultipleUnder} />
            </SearchContext.Provider>
        );
        searchContextValue.searchResults.facet.forEach((f) => {
            expect(getByText(f.name)).toBeInTheDocument();
        });
        expect(document.querySelector(".facetValue")).not.toBeInTheDocument();
    });

});
