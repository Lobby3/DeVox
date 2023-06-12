import { render } from "@testing-library/react";

import Funded from "./funded";

describe("Funded", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Funded />);
    expect(baseElement).toBeTruthy();
  });
});
