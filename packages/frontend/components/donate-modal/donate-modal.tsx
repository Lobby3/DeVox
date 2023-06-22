/* eslint-disable-next-line */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
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
import React from "react";
import { toast } from "react-toastify";

import { useBalance } from "../../hooks/balance";
import { useDonate } from "../../hooks/donate";

export interface DonateModalProps extends ModalProps {}

export function DonateModal({
  isOpen,
  onClose,
}: Omit<DonateModalProps, "children">) {
  const { isActive } = useWeb3React();
  const { balance, symbol } = useBalance();
  const donate = useDonate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader>
          <Heading textAlign={"center"} textTransform={"uppercase"}>
            Donate
          </Heading>
        </ModalHeader>
        <Formik
          initialValues={{
            amount: 0,
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.amount > balance.toNumber()) {
              errors["amount"] = "Insufficient balance";
            }
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const txHash = await donate.mutateAsync({
                amountInToken: values.amount,
                message: "",
              });
              console.log(txHash);
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
                        <InputGroup>
                          <InputLeftElement pointerEvents="none" children="$" />
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
                      {symbol && (
                        <Text>
                          Balance: {balance.toString()} {symbol}
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
      </ModalContent>
    </Modal>
  );
}

export default DonateModal;
