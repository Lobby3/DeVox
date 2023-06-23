import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";

import { useShamanWhitelist } from "../../hooks/whitelist";

export interface ZipVerificationFormProps {
  campaignId: string;
  onSuccessfulVerification: () => void;
}

const ZipVerificationForm = ({
  campaignId,
  onSuccessfulVerification,
}: ZipVerificationFormProps) => {
  const { isActive } = useWeb3React();
  const whiteList = useShamanWhitelist(campaignId);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Formik
      initialValues={{
        zipCode: "12345",
        shareZipCode: true,
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.zipCode) {
          errors.zipCode = "Required";
        } else if (values.zipCode.length < 5) {
          errors.zipCode = "Must be 5 characters or more";
        } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(values.zipCode)) {
          errors.zipCode = "Invalid Zip Code";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        try {
          const txHash = await whiteList.mutateAsync({
            status: true,
            zipCode: values.zipCode,
            share: values.shareZipCode,
          });
          console.log(txHash);
          onSuccessfulVerification();
        } catch (e) {
          console.log(e);
          toast("Error submitting ZIP Code", {
            type: "error",
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => {
        const disabled = !isValid || isSubmitting || !isActive;
        return (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={10} alignItems={"flex-start"}>
              {!isActive && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Not Connected</AlertTitle>
                  <AlertDescription>
                    Please connect your wallet to continue.
                  </AlertDescription>
                </Alert>
              )}
              <FormControl
                isRequired
                isInvalid={!!(errors.zipCode && touched.zipCode)}
              >
                <FormLabel textTransform={"uppercase"}>Zip Code</FormLabel>
                <Input
                  type="text"
                  name="zipCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipCode}
                  isDisabled={disabled}
                />
                <FormHelperText>Your personal zip code</FormHelperText>
                <FormErrorMessage>{errors.zipCode}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel textTransform={"uppercase"}>
                  Share Zip Code
                </FormLabel>
                <Switch
                  name="shareZipCode"
                  onChange={handleChange}
                  isChecked={values.shareZipCode}
                  isDisabled={disabled}
                />
                <FormHelperText>Share your zip code</FormHelperText>
                {errors.shareZipCode &&
                  touched.shareZipCode &&
                  errors.shareZipCode}
              </FormControl>
              <Button isDisabled={disabled} type="submit">
                Submit
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ZipVerificationForm;
