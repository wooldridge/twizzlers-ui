import Address from "./Address";
import {render} from "@testing-library/react";

const config = { 
    street1: "address.street1",
    street2: "address.street2",
    city: "address.city",
    state: "address.state",
    postal1: "address.postal1",
    postal2: "address.postal2"
};

const data = { 
    address: {
        street1: "123 Main St.",
        street2: "Apt. 456",
        city: "Anytown",
        state: "CA",
        postal1: "12345",
        postal2: "6789"
    }
};

describe("Address component", () => {

    test("Verify address is rendered", () => {
        const {getByText} = render(<Address config={config} data={data} />);
        expect(getByText(data.address.street1 + ",")).toBeInTheDocument();
        expect(getByText(data.address.street2 + ",")).toBeInTheDocument();
        expect(getByText(data.address.city + ",")).toBeInTheDocument();
        expect(getByText(data.address.state)).toBeInTheDocument();
        expect(getByText(data.address.postal1)).toBeInTheDocument();
        expect(getByText("-" + data.address.postal2)).toBeInTheDocument();
    });

});
