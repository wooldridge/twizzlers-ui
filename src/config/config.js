export const config = { 
    title: "Twizzlers-UI",
    entities: [
        "Person",
        "Place",
        "Thing"
    ],
    menus: [
        {
            label: "Search",
            to: "/search"
        },
        {
            label: "ML Home",
            url: "http://www.marklogic.com"
        }
    ],
    search:  {
        snippet: {
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
            phone: "entityInstance.phone",
            email: "entityInstance.email",
            items: ["entityInstance.ssn", "entityInstance.status"]
        }
    }
};