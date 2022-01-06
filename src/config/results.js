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
    snippet: {
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
                    street1: "extracted.person.address.street",
                    city: "extracted.person.address.city",
                    state: "extracted.person.address.state",
                    postal1: "extracted.person.address.zip.fiveDigit",
                    postal2: "extracted.person.address.zip.plusFour"
                },
                styles: {
                    width: "350px",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            },
            { value: "extracted.person.phone", class: "phone"},
            { value: "extracted.person.email", class: "email"},
            "extracted.person.ssn"
        ],
        categories: "extracted.person.sources",
        timestamp: {
            value: "extracted.person.createdOn",
            label: "Created On:"
        },
        status: "extracted.person.status"
    }
};