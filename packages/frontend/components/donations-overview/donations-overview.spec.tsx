import { render } from "@testing-library/react";

import DonationsOverview from "./donations-overview";

describe("DonationsOverview", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DonationsOverview />);
    expect(baseElement).toBeTruthy();
  });
});
