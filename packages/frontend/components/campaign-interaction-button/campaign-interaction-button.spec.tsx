import { render } from "@testing-library/react";

import CampaignInteractionButton from "./campaign-interaction-button";

describe("CampaignInteractionButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CampaignInteractionButton />);
    expect(baseElement).toBeTruthy();
  });
});
