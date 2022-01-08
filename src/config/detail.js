export const configDetail = { 
    heading: {
        id: "result[0].extracted.person.personId",
        thumbnail: {
            src: "result[0].extracted.person.image",
            width: 100,
            height: 100
        },
        title: "result[0].extracted.person.name"
    },
    personal: {
        name: {
            id: "name",
            title: "Name",
            property: "result[0].extracted.person.name",
            width: 300,
            metadata: [
                {
                    type: "block",
                    color: "#96bde4",
                    value: "B"
                },
                {
                    type: "block",
                    color: "#5d6aaa",
                    value: "4"
                }
            ]
        },
        phone: {
            id: "phone",
            title: "Phone Number",
            property: "result[0].extracted.person.phone",
            icon: "phone",
            width: 300,
            metadata: [
                {
                    type: "block",
                    color: "#96bde4",
                    value: "B"
                },
                {
                    type: "block",
                    color: "#5d6aaa",
                    value: "4"
                }
            ]
        },
        email: {
            id: "email",
            title: "Email",
            property: "result[0].extracted.person.email",
            icon: "email",
            width: 400,
            metadata: [
                {
                    type: "block",
                    color: "#96bde4",
                    value: "B"
                },
                {
                    type: "block",
                    color: "#5d6aaa",
                    value: "4"
                }
            ]
        },
        address: {
            id: "address",
            title: "Address",
            width: 600,
            addressPath: "extracted.person.address",
            cols: [
                {
                    title: "Street",
                    value: "street"
                },
                {
                    title: "City",
                    value: "city"
                },
                {
                    title: "State",
                    value: "state"
                },
                {
                    title: "Zip",
                    value: "zip.fiveDigit"
                }
            ],
            metadata: [
                {
                    type: "block",
                    color: "#96bde4",
                    value: "B"
                },
                {
                    type: "block",
                    color: "#5d6aaa",
                    value: "4"
                }
            ]
        }
    }
};