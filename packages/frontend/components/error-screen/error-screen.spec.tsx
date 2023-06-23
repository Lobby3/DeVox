import { render } from "@testing-library/react";

import ErrorScreen from "./error-screen";

describe("ErrorScreen", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ErrorScreen />);
    expect(baseElement).toBeTruthy();
  });
});
