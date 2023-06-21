import {
  FormSegment,
  SplitColumn,
  WrappedInput,
  WrappedSelect,
} from "@daohaus/ui";
import { ValidateField } from "@daohaus/utils";
import { useEffect, useState } from "react";
import React from "react";
import { useFormContext } from "react-hook-form";

import { TreasuryTokenKeychains } from "../utils";
import { FORM_KEYS } from "../utils/formKeys";

export const TreasuryTokenSegment = ({
  formDisabled,
}: {
  formDisabled: boolean;
}) => {
  const {
    watch,
    formState: { errors, touchedFields },
  } = useFormContext();
  const treasuryToken = watch(FORM_KEYS.TREASURY_TOKEN);

  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (treasuryToken == null) return;
    if (treasuryToken === "") {
      setHelperText("Please select a token for the campaign.");
      return;
    }
  }, [treasuryToken, errors, touchedFields]);

  return (
    <FormSegment
      title="Campaign Treasury"
      description="Select the token that will be used for the treasury and the target amount for the campaign."
      formArea={
        <SplitColumn
          rows={[
            {
              rowId: "treasuryToken1",
              left: (
                <WrappedSelect
                  id={FORM_KEYS.TREASURY_TOKEN}
                  label="Token"
                  disabled={formDisabled}
                  helperText={helperText}
                  options={Object.keys(TreasuryTokenKeychains).map((token) => ({
                    name: token,
                    value: token,
                  }))}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.CAMPAIGN_TARGET}
                  label={`Target (${treasuryToken})`}
                  full
                  info="The target amount of funds to be raised."
                  disabled={formDisabled}
                  rules={{
                    required: "This value is required",
                    validate: (val) => ValidateField.number(val),
                  }}
                />
              ),
            },
          ]}
        />
      }
    />
  );
};
