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
            title: "Name",
            property: "result[0].extracted.person.name",
            width: 300,
            labels: [
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
            title: "Phone Number",
            property: "result[0].extracted.person.phone",
            width: 300,
            labels: [
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
            title: "Email",
            property: "result[0].extracted.person.email",
            width: 300,
            labels: [
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
            title: "Address",
            width: 600,
            cols: [
                {
                    title: "Street",
                    value: "result[0].extracted.person.address.street"
                },
                {
                    title: "City",
                    value: "result[0].extracted.person.address.city"
                },
                {
                    title: "State",
                    value: "result[0].extracted.person.address.state"
                },
                {
                    title: "Zip",
                    value: "result[0].extracted.person.address.zip.fiveDigit"
                }
            ],
            labels: [
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