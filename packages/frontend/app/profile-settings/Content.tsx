import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@daohaus/ui";
import { useWeb3React } from "@web3-react/core";
import { Form, Formik } from "formik";
import { JSEncrypt } from "jsencrypt";
import React from "react";

import BodyContainer from "../../components/body-container/body-container";

const Content = () => {
  const { provider } = useWeb3React();
  const toast = useToast();

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <BodyContainer>
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
          let encryptedZipCode = "";
          if (values.shareZipCode) {
            if (!provider) {
              toast.errorToast({
                title: "No Provider",
                description: "Please connect your wallet",
              });
              return;
            }

            const encrypt = new JSEncrypt();
            const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
            const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY_TEST;

            if (!publicKey) {
              throw new Error("No public key");
            }
            console.log(publicKey, privateKey);
            encrypt.setPublicKey(publicKey);

            const result = encrypt.encrypt(values.zipCode);

            if (!result) {
              throw new Error("No encrypted zip code");
            }

            encryptedZipCode = result;

            console.log(encryptedZipCode);
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
          /* and other goodies */
        }) => {
          const disabled = !isValid || isSubmitting;
          return (
            <Form onSubmit={handleSubmit}>
              <VStack>
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
    </BodyContainer>
  );
};

export default Content;
