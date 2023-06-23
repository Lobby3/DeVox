import { render } from "@testing-library/react";

import ZipVerificationForm from "./zip-verification-form";

describe("ZipVerificationForm", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ZipVerificationForm campaignId="" onSuccessfulVerification={() => {}} />
    );
    expect(baseElement).toBeTruthy();
  });
});
