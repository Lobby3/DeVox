import { render } from "@testing-library/react";

import DonateModal from "./donate-modal";

describe("DonateModal", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DonateModal />);
    expect(baseElement).toBeTruthy();
  });
});
