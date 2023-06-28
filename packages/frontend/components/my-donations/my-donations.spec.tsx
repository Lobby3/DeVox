import { render } from "@testing-library/react";

import MyDonations from "./my-donations";

describe("MyDonations", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MyDonations />);
    expect(baseElement).toBeTruthy();
  });
});
