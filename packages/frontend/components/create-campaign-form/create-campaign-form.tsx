import {
  Alert,
  AlertDialogBody,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Form, Formik } from "formik";
import Link from "next/link";
import React from "react";

import BodyContainer from "../body-container/body-container";

/* eslint-disable-next-line */
export interface CreateCampaignFormProps {}

export function CreateCampaignForm(props: CreateCampaignFormProps) {
  const { isActive } = useWeb3React();
  return (
    <BodyContainer>
      <Formik
        initialValues={{
          title: "",
          description: "",
          targetAmount: 0,
          image: null as File | null,
        }}
        validate={(values) => {
          const errors = {};

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
          /* and other goodies */
        }) => {
          const disabled = isSubmitting || !isActive;
          return (
            <Form onSubmit={handleSubmit} style={{ width: "50%" }}>
              <VStack
                spacing={8}
                sx={{ fontFamily: "Inter" }}
                alignItems={"flex-start"}
              >
                {!isActive ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>
                      Please connect your wallet to start a campaign.
                    </AlertTitle>
                  </Alert>
                ) : null}
                <Heading textTransform="uppercase">
                  Start a new campaign
                </Heading>
                <FormControl>
                  <FormLabel textTransform={"uppercase"}>
                    Title of campaign
                  </FormLabel>
                  <Input
                    disabled={disabled}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <FormHelperText>The title of the campaign</FormHelperText>
                  {errors.title && touched.title && errors.title}
                </FormControl>
                <FormControl>
                  <FormLabel textTransform={"uppercase"}>
                    Goal to reach
                  </FormLabel>
                  <Input
                    disabled={disabled}
                    width={200}
                    type="number"
                    name="targetAmount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.targetAmount}
                  />
                  {errors.targetAmount &&
                    touched.targetAmount &&
                    errors.targetAmount}
                  <FormHelperText>
                    The target amount of the campaign
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel textTransform={"uppercase"}>Description</FormLabel>
                  <Textarea
                    disabled={disabled}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description &&
                    touched.description &&
                    errors.description}
                  <FormHelperText>
                    The description of the campaign
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel textTransform={"uppercase"}>
                    Campaign image
                  </FormLabel>
                  <Input
                    disabled={disabled}
                    name="image"
                    onChange={handleChange}
                    type="file"
                    sx={{
                      "::file-selector-button": {
                        height: 10,
                        padding: 0,
                        mr: 4,
                        background: "none",
                        border: "none",
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <FormHelperText>
                    The image that will be show with your campaign
                  </FormHelperText>
                </FormControl>

                <HStack>
                  <Link href={"/"}>
                    <Button
                      isDisabled={disabled}
                      textTransform={"uppercase"}
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    textTransform={"uppercase"}
                    type="submit"
                    isDisabled={disabled}
                  >
                    Start campaign
                  </Button>
                </HStack>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </BodyContainer>
  );
}

export default CreateCampaignForm;
