import { render } from "@testing-library/react";

import CampaignTile from "./campaign-tile";

describe("CampaignTile", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CampaignTile />);
    expect(baseElement).toBeTruthy();
  });
});
