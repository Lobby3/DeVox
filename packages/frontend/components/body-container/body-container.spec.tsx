import { render } from "@testing-library/react";

import BodyContainer from "./body-container";

describe("BodyContainer", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BodyContainer />);
    expect(baseElement).toBeTruthy();
  });
});
