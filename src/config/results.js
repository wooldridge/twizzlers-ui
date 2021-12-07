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
        id: "entityInstance.personId",
        thumbnail: {
            src: "entityInstance.image",
            width: 100,
            height: 100
        },
        title: "entityInstance.name",
        address: {
            street: "entityInstance.address.street",
            city: "entityInstance.address.city",
            state: "entityInstance.address.state",
            zip: ["entityInstance.address.zip.fiveDigit", "entityInstance.address.zip.plusFour"]
        },
        items: [
            { value: "entityInstance.phone", class: "phone"},
            { value: "entityInstance.email", class: "email"},
            "entityInstance.ssn"
        ],
        categories: "entityInstance.sources",
        timestamp: {
            value: "createdOn",
            label: "Created On:"
        },
        status: "entityInstance.status"
    }
};