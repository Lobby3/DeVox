import { render } from "@testing-library/react";

import CampaignGridView from "./campaign-grid-view";

describe("CampaignGridView", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CampaignGridView />);
    expect(baseElement).toBeTruthy();
  });
});
