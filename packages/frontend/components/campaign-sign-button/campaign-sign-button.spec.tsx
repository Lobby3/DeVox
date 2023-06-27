import { render } from "@testing-library/react";

import CampaignSignButton from "./campaign-sign-button";

describe("CampaignSignButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CampaignSignButton campaignId="" />);
    expect(baseElement).toBeTruthy();
  });
});
