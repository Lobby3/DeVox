import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { useGetCampaign } from "../../graph/campaigns";
import { useBalance } from "../../hooks/balance";
import { useDonate } from "../../hooks/donate";
import { useTokenInfo } from "../../hooks/token";
import { useUserHasVerifiedZipCode } from "../../hooks/whitelist";
import Loader from "../loader/loader";
import ZipVerificationForm from "../zip-verification-form/zip-verification-form";

export interface DonateModalProps extends Omit<ModalProps, "children"> {
  campaignId: string;
}

export function DonateModal({ isOpen, onClose, campaignId }: DonateModalProps) {
  const { data: campaign, isFetched: isFetchedCampaign } =
    useGetCampaign(campaignId);
  const {
    data: hasVerified,
    isFetching: isFetchingZipCodeStatus,
    isFetched: isFetchedZipCodeStatus,
  } = useUserHasVerifiedZipCode();

  const [step, setStep] = React.useState<
    "zip-verification" | "donate" | "success"
  >("zip-verification");

  useEffect(() => {
    if (!isFetchingZipCodeStatus && hasVerified) {
      setStep("donate");
    }
  }, [isFetchingZipCodeStatus, isFetchedZipCodeStatus, hasVerified]);

  const { isActive } = useWeb3React();
  const { formattedBalance } = useBalance(campaign?.tokenAddress);
  const { symbol } = useTokenInfo(campaign?.tokenAddress);
  const donate = useDonate(campaignId);
  const isFetched = isFetchedCampaign && isFetchedZipCodeStatus;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4} my="auto">
        {!isFetched && <Loader />}
        {isFetched && step === "zip-verification" && (
          <ZipVerificationForm
            campaignId={campaignId}
            onSuccessfulVerification={() => setStep("donate")}
          />
        )}
        {isFetched && step === "donate" && (
          <Formik
            initialValues={{
              amount: 0,
              message: "",
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (values.amount > Number(formattedBalance)) {
                errors["amount"] = "Insufficient balance";
              }
              return errors;
            }}
            onSubmit={async (values) => {
              try {
                const txHash = await donate.mutateAsync({
                  amountInToken: values.amount,
                  message: values.message,
                });
                console.log(txHash);
                setStep("success");
              } catch (e) {
                console.log(e);
                toast("Error donating", {
                  type: "error",
                });
              }
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              submitForm,
            }) => {
              const disabled = !isValid || isSubmitting || !isActive;
              return (
                <>
                  <ModalHeader>
                    <Heading textAlign={"center"} textTransform={"uppercase"}>
                      Donate
                    </Heading>
                  </ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      <VStack spacing={10} alignItems={"center"}>
                        {!isActive && (
                          <Alert status="error">
                            <AlertIcon />
                            <VStack alignItems={"flex-start"} spacing={0}>
                              <AlertTitle>Not Connected</AlertTitle>
                              <AlertDescription>
                                Please connect your wallet to continue.
                              </AlertDescription>
                            </VStack>
                          </Alert>
                        )}
                        <FormControl
                          maxWidth={300}
                          isRequired
                          isInvalid={!!errors.amount}
                        >
                          <FormLabel>Amount</FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              // children="$"
                            />
                            <Input
                              type="number"
                              name="amount"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.amount}
                              isDisabled={!isActive}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.amount}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                          maxWidth={300}
                          isInvalid={!!errors.message}
                        >
                          <FormLabel>Message</FormLabel>
                          <Input
                            type="text"
                            maxLength={32}
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            isDisabled={!isActive}
                          />
                          <FormErrorMessage>{errors.message}</FormErrorMessage>
                        </FormControl>
                        {symbol && (
                          <Text>
                            Balance: {formattedBalance} {symbol}
                          </Text>
                        )}
                      </VStack>
                    </Form>
                  </ModalBody>
                  <ModalFooter justifyContent={"center"}>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={submitForm}
                      isDisabled={disabled}
                    >
                      Donate
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </>
              );
            }}
          </Formik>
        )}
        {isFetched && step === "success" && (
          <>
            <ModalHeader>
              <Heading textAlign={"center"} textTransform={"uppercase"}>
                WOO! 🎉
              </Heading>
            </ModalHeader>
            <ModalBody>
              <Text textAlign={"center"}>
                Congratulations! You just completed this proposal. Share the
                word with the rest of the supporters and let’s start planning
                and getting the event in order!
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DonateModal;
