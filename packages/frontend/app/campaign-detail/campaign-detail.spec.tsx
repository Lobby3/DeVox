import { render } from "@testing-library/react";

import CampaignDetail from "./campaign-detail";

describe("CampaignDetail", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CampaignDetail campaignId="" />);
    expect(baseElement).toBeTruthy();
  });
});
