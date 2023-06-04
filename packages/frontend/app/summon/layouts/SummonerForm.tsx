import { SummonParams, assembleTxArgs } from "@daohaus/contract-utils";
import { useHausConnect } from "@daohaus/daohaus-connect-feature";
import { isValidNetwork } from "@daohaus/keychain-utils";
import { useTxBuilder } from "@daohaus/tx-builder";
import {
  Bold,
  Button,
  Divider,
  H1,
  Link,
  ParMd,
  WrappedInput,
  useToast,
} from "@daohaus/ui";
import { ReactSetter } from "@daohaus/utils";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { ConnectBox } from "../components/ConnectBox/ConnectBox";
import { AdvancedSegment } from "../layouts/AdvancedSegment";
import { MembersSegment } from "../layouts/MemberSegment";
import { ShamanSegment } from "../layouts/ShamanSegment";
import { StakeTokensSegment } from "../layouts/StakeTokenSegment";
import { TimingSegment } from "../layouts/TimingSegment";
import { SummonStates } from "../types";
import { FORM_KEYS } from "../utils/formKeys";
import { SummonTX } from "../utils/summonlegos";

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
  const { chainId: chainBeforeFormatting, isActive } = useWeb3React();
  const { fireTransaction } = useTxBuilder();
  const methods = useForm({ mode: "onTouched" });
  const {
    formState: { isValid },
  } = methods;
  const { errorToast, successToast } = useToast();

  const chainId = `0x${chainBeforeFormatting}`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitDisabled = !isValid || isSubmitting || !isValidNetwork(chainId);
  const formDisabled = isSubmitting;

  console.log(chainId, isValidNetwork(chainId?.toString()));

  const handleFormSubmit: SubmitHandler<SummonParams> = async (formValues) => {
    if (!chainId || !isValidNetwork(chainId)) {
      setSummonState("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const args = assembleTxArgs(formValues, chainId);

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
            <Bold>Summon a DAO</Bold>
          </H1>
          <ParMd>
            Learn more about{" "}
            <Link href="https://daohaus.mirror.xyz/U_JQtheSzdpRFqQwf9Ow3LgLNG0WMZ6ibAyrjWDu_fc">
              Moloch v3
            </Link>
          </ParMd>
        </div>
        <div>
          <WrappedInput
            id={FORM_KEYS.DAO_NAME}
            label="DAO Name"
            placeholder="DAO Name"
            full
            disabled={formDisabled}
            rules={{
              required: "DAO name is required",
              maxLength: {
                value: 128,
                message: "DAO name must be 128 characters or less",
              },
            }}
          />
          <Divider className="top-divider" />
        </div>
        <StakeTokensSegment formDisabled={formDisabled} />
        <TimingSegment formDisabled={formDisabled} />
        <AdvancedSegment formDisabled={formDisabled} />
        <MembersSegment formDisabled={formDisabled} />
        <ShamanSegment formDisabled={formDisabled} />
        {!isActive && <ConnectBox />}
        <Button
          fullWidth
          // centerAlign
          size="lg"
          type="submit"
          disabled={submitDisabled}
        >
          Summon DAO
        </Button>
      </form>
    </FormProvider>
  );
};
