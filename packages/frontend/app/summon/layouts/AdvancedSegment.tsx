import { FormSegment, SplitColumn, WrappedInput } from "@daohaus/ui";
import {
  INFO_COPY,
  ValidateField,
  handleBaseUnits,
  isString,
} from "@daohaus/utils";
import { useEffect, useState } from "react";
import React from "react";
import { useFormContext } from "react-hook-form";

import { FORM_KEYS } from "../utils/formKeys";

const DEFAULT_ASSET_SYMBOL = "ETH";

export const AdvancedSegment = ({
  formDisabled,
}: {
  formDisabled: boolean;
}) => {
  const {
    watch,
    formState: { touchedFields },
  } = useFormContext();
  const treasuryToken = watch(FORM_KEYS.TREASURY_TOKEN);
  const [nativeSymbol, setNativeSymbol] =
    useState<string>(DEFAULT_ASSET_SYMBOL);

  useEffect(() => {
    if (isString(treasuryToken)) {
      setNativeSymbol(treasuryToken);
    } else {
      setNativeSymbol(DEFAULT_ASSET_SYMBOL);
    }
  }, [touchedFields, treasuryToken]);

  return (
    <FormSegment
      title="Advanced Governance"
      description="Customize advanced governance features."
      formArea={
        <SplitColumn
          rows={[
            {
              rowId: "advanced1",
              left: (
                <WrappedInput
                  id={FORM_KEYS.QUORUM}
                  label="Quorum %"
                  full
                  info={INFO_COPY.QUORUM}
                  defaultValue="0"
                  disabled={formDisabled}
                  rules={{
                    required: "This value is required",
                    validate: (val) => ValidateField.percent(val),
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.MIN_RETENTION}
                  label="Min Retention %"
                  defaultValue="66"
                  info={INFO_COPY.MIN_RETENTION}
                  full
                  disabled={formDisabled}
                  rules={{
                    required: "This value is required",
                    validate: (val) => ValidateField.percent(val),
                  }}
                />
              ),
            },
            {
              rowId: "advanced2",
              left: (
                <WrappedInput
                  id={FORM_KEYS.SPONSOR_THRESHOLD}
                  label="Sponsor Threshold"
                  defaultValue="0"
                  full
                  info={INFO_COPY.SPONSOR_THRESHOLD}
                  disabled={formDisabled}
                  rules={{
                    required: "This value is required",
                    setValueAs: (val) => handleBaseUnits(val),
                    validate: (val) => ValidateField.number(val),
                  }}
                />
              ),
              right: (
                <WrappedInput
                  id={FORM_KEYS.OFFERING}
                  label={`New Offering (${nativeSymbol})`}
                  defaultValue="0"
                  full
                  info={INFO_COPY.NEW_OFFERING}
                  disabled={formDisabled}
                  rules={{
                    required: "This value is required",
                    validate: (val) => ValidateField.number(val),
                    setValueAs: (val) => handleBaseUnits(val),
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
