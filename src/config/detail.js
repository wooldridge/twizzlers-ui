export const configDetail = { 
    heading: {
        id: "entityInstance.customerId",
        thumbnail: {
            src: "entityInstanceProperties.image",
            width: 100,
            height: 100
        },
        title: "entityInstanceProperties.name"
    },
    personal: {
        name: {
            title: "Name",
            property: "entityInstanceProperties.name",
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
            property: "entityInstanceProperties.phone",
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
            property: "entityInstanceProperties.email",
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
                    value: "entityInstanceProperties.address.street"
                },
                {
                    title: "City",
                    value: "entityInstanceProperties.address.city"
                },
                {
                    title: "State",
                    value: "entityInstanceProperties.address.state"
                },
                {
                    title: "Zip",
                    value: "entityInstanceProperties.address.zip.fiveDigit"
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