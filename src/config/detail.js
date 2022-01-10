export const configDetail = { 
    heading: {
        id: "result[0].extracted.person.personId",
        thumbnail: {
            src: "result[0].extracted.person.image",
            width: "70px",
            height: "70px"
        },
        title: "result[0].extracted.person.name"
    },
    personal: {
        name: {
            id: "name",
            title: "Name",
            dataPath: "result[0].extracted.person.name",
            width: "350px",
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
            dataPath: "result[0].extracted.person.phone",
            icon: "phone",
            width: "400px",
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
            dataPath: "result[0].extracted.person.email",
            icon: "email",
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
            width: "600px",
            dataPath: "result[0].extracted.person.address",
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