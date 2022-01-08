export const configResults = { 
    sidebar: {
        meter: {
            colors: {
                all: "#cccccc",
                filters: "#5fc9aa"
            }
        },
        facets: [
            {
                type: "category",
                value: "Collection",
                disabled: true
            },
            {
                type: "category",
                value: "sources"
            },
            {
                type: "category",
                value: "status"
            }
        ]
    },
    results: {
        id: "extracted.person.personId",
        thumbnail: {
            src: "extracted.person.image",
            width: 100,
            height: 100
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
        categories: "extracted.person.sources",
        timestamp: {
            value: "extracted.person.createdOn",
            label: "Created on"
        },
        status: "extracted.person.status"
    }
};