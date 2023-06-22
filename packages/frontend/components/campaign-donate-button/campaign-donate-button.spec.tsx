import { render } from "@testing-library/react";

import CampaignDonateButton from "./campaign-donate-button";

describe("CampaignDonateButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CampaignDonateButton />);
    expect(baseElement).toBeTruthy();
  });
});
