export const configResults = { 
    sidebar: {
        facets: [
            {
                type: "category",
                value: "Entities"
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
        id: "entityInstance.customerId",
        thumbnail: {
            src: "entityInstance.image",
            width: 100,
            height: 100
        },
        title: "entityInstance.name",
        createdOn: "createdOn",
        address: {
            street: "entityInstance.address.street",
            city: "entityInstance.address.city",
            state: "entityInstance.address.state",
            zip: ["entityInstance.address.zip.fiveDigit", "entityInstance.address.zip.plusFour"]
        },
        phone: "entityInstance.phone",
        email: "entityInstance.email",
        items: ["entityInstance.ssn", "entityInstance.status"]
    }
};