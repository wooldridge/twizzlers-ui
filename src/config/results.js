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
                value: "Entities",
                disabled: true
            },
            {
                type: "category",
                value: "Sources"
            },
            {
                type: "category",
                value: "Status"
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
        address: {
            street: "extracted.person.address.street",
            city: "extracted.person.address.city",
            state: "extracted.person.address.state",
            zip: ["extracted.person.address.zip.fiveDigit", "extracted.person.address.zip.plusFour"]
        },
        items: [
            { value: "extracted.person.phone", class: "phone"},
            { value: "extracted.person.email", class: "email"},
            "extracted.person.ssn"
        ],
        categories: "extracted.person.sources",
        // timestamp: {
        //     value: "createdOn",
        //     label: "Created On:"
        // },
        status: "extracted.person.status"
    }
};