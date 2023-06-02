import { render } from "@testing-library/react";

import CreateCampaignForm from "./create-campaign-form";

describe("CreateCampaignForm", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CreateCampaignForm />);
    expect(baseElement).toBeTruthy();
  });
});
