import { render } from "@testing-library/react";

import CampaignInteractionButton from "./campaign-interaction-button";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("CampaignInteractionButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <CampaignInteractionButton
        title="test title"
        subtitle={"test subtitle"}
        onClick={() => {
          return;
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
