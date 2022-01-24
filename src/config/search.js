export const configSearch = { 
    meter: {
        colors: {
            all: "#cccccc",
            filters: "#1ACCA8"
        }
    },
    facets: {
        selected: "#1acca8",
        unselected: "#dfdfdf",
        displayThreshold: 3,
        displayShort: 3,
        displayLong: 5,
        items: [
            {
                type: "category",
                name: "Collection",
                tooltip: "Filter by entity.",
                disabled: true
            },
            {
                type: "category",
                name: "sources",
                tooltip: "Filter by source."
            },
            {
                type: "category",
                name: "status",
                tooltip: "Filter by status."
            },
            {
                type: "category",
                name: "email",
                tooltip: "Filter by email."
            },
            {
                type: "category",
                name: "name",
                tooltip: "Filter by name."
            },
            {
                type: "category",
                name: "personId",
                tooltip: "Filter by ID."
            }
        ]
    },
    results: {
        id: "extracted.person.personId",
        thumbnail: {
            src: "extracted.person.image",
            width: "70px",
            height: "70px"
        },
        title: "extracted.person.name",
        items: [
            { 
                component: "Address", 
                config: {
                    addressPath: "extracted.person.address",
                    street1: "street",
                    city: "city",
                    state: "state",
                    postal1: "zip.fiveDigit",
                    postal2: "zip.plusFour"
                },
                styles: {
                    width: "350px",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            },
            { value: "extracted.person.phone", className: "phone" },
            { value: "extracted.person.email", className: "email" },
            { value: "extracted.person.ssn" }
        ],
        categories: {
            value: "extracted.person.sources",
            colors: "sourcesColors"
        },
        timestamp: {
            value: "extracted.person.createdOn",
            label: "Created on"
        },
        status: "extracted.person.status"
    }
};