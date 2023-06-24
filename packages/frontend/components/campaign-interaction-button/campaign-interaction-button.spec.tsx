import { render } from "@testing-library/react";

import CampaignInteractionButton from "./campaign-interaction-button";

describe("CampaignInteractionButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <CampaignInteractionButton
        title="test title"
        subtitle={"test subtitle"}
        onClick={() => {}}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
