import { SummonParams } from "@daohaus/contract-utils";
import { isValidNetwork } from "@daohaus/keychain-utils";
import { useTxBuilder } from "@daohaus/tx-builder";
import { Bold, Button, Divider, H1, WrappedInput, useToast } from "@daohaus/ui";
import { ReactSetter } from "@daohaus/utils";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import ConnectButton from "../../../components/connect-button/connect-button";
import { AdvancedSegment } from "../layouts/AdvancedSegment";
import { MembersSegment } from "../layouts/MemberSegment";
import { StakeTokensSegment } from "../layouts/StakeTokenSegment";
import { TimingSegment } from "../layouts/TimingSegment";
import { SummonStates } from "../types";
import { hexadecimalize } from "../utils";
import { assembleTxArgs } from "../utils/assembleTxArgs";
import { FORM_KEYS } from "../utils/formKeys";
import { SummonTX } from "../utils/summonlegos";
import { TreasuryTokenSegment } from "./TreasuryTokenSegment";

type SummonFormProps = {
  setSummonState: ReactSetter<SummonStates>;
  setTxHash: ReactSetter<string>;
  setDaoAddress: ReactSetter<string>;
  setErrMsg: ReactSetter<string>;
};

export const SummonerForm = ({
  setSummonState,
  setTxHash,
  setDaoAddress,
  setErrMsg,
}: SummonFormProps) => {
  const { chainId, isActive, account } = useWeb3React();
  const { fireTransaction } = useTxBuilder();
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      [FORM_KEYS.TOKEN_NAME]: "DeVox",
      [FORM_KEYS.TOKEN_SYMBOL]: "DVOX",
      [FORM_KEYS.LOOT_TOKEN_NAME]: "DeVox Loot",
      [FORM_KEYS.LOOT_TOKEN_SYMBOL]: "DVOXL",
      [FORM_KEYS.VOTE_TOKEN_TRANSFER]: true,
      [FORM_KEYS.NV_TOKEN_TRANSFER]: false,
      [FORM_KEYS.SPONSOR_THRESHOLD]: "1",
      [FORM_KEYS.TREASURY_TOKEN]: "DAI",
      [FORM_KEYS.MEMBERS]: account && `${account} 1000000 0`,
    },
  });
  const {
    formState: { isValid },
  } = methods;
  const { errorToast, successToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chainIdHex = hexadecimalize(chainId);
  const submitDisabled =
    !isValid || !isValidNetwork(chainIdHex) || isSubmitting;
  const formDisabled = isSubmitting;

  // console.log("chainId (valid)", chainIdHex, isValidNetwork(chainIdHex));
  // console.log("account", account);

  const handleFormSubmit: SubmitHandler<SummonParams> = async (formValues) => {
    if (!chainIdHex || !isValidNetwork(chainIdHex)) {
      setSummonState("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const args = assembleTxArgs(formValues, chainIdHex);

      fireTransaction({
        tx: {
          ...SummonTX,
          staticArgs: args,
        },
        lifeCycleFns: {
          onTxHash(txHash) {
            setSummonState("loading");
            setTxHash(txHash);
          },
          onPollSuccess(result) {
            const daoAddress = result?.data?.transaction?.daoAddress;
            if (daoAddress) {
              successToast({
                title: "DAO Summoned",
                description: "Your Moloch V3 has been summoned!",
              });
              setSummonState("success");
              setDaoAddress(daoAddress);
            } else {
              setSummonState("error");
              setErrMsg(
                "Subgraph Poll did not include a DAO address. Check Transaction receipt below for Summon data"
              );
              errorToast({
                title: "Summon Error",
                description: "No DAO address found",
              });
            }
          },
          onTxError(error) {
            console.log(error);
            if (error instanceof Error) {
              setErrMsg(error.message);
              errorToast({ title: "Summon Error", description: error.message });
            } else {
              setErrMsg("Unknown error");
              errorToast({
                title: "Summon Error",
                description: "Unknown error",
              });
            }
          },
          onPollError(error) {
            if (error instanceof Error) {
              setErrMsg(error.message);
              errorToast({ title: "Summon Error", description: error.message });
            } else {
              setErrMsg("Unknown error");
              errorToast({
                title: "Summon Error",
                description: "Unknown error",
              });
            }
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrMsg(error.message);
        errorToast({ title: "Summon Error", description: error.message });
      } else {
        setErrMsg("Unknown error");
        errorToast({
          title: "Summon Error",
          description: "Unknown error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="main-column"
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="title-section">
          <H1 className="title">
            <Bold>Create a Campaign DAO</Bold>
          </H1>
        </div>
        <div>
          <WrappedInput
            id={FORM_KEYS.DAO_NAME}
            label="Campaign Name"
            placeholder="Campaign Name"
            full
            disabled={formDisabled}
            rules={{
              required: "Campaign name is required",
              maxLength: {
                value: 128,
                message: "Campaign name must be 128 characters or less",
              },
            }}
          />
          <WrappedInput
            id={FORM_KEYS.DAO_DESCRIPTION}
            label="Campaign Description"
            placeholder="Campaign Description"
            full
            disabled={formDisabled}
          />
          <WrappedInput
            id={FORM_KEYS.DAO_AVATAR_IMG_URL}
            label="Campaign Avatar Image URL"
            placeholder="Campaign Avatar Image URL"
            full
            disabled={formDisabled}
          />
          <Divider className="top-divider" />
        </div>
        <TreasuryTokenSegment formDisabled={formDisabled} />
        <StakeTokensSegment formDisabled={formDisabled} />
        <TimingSegment formDisabled={formDisabled} />
        <AdvancedSegment formDisabled={formDisabled} />
        <MembersSegment formDisabled={formDisabled} />
        {!isActive && <ConnectButton />}
        <Button
          fullWidth
          // centerAlign
          size="lg"
          type="submit"
          disabled={submitDisabled}
        >
          Create DAO
        </Button>
      </form>
    </FormProvider>
  );
};
