import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import styles from "./create-campaign-form.module.css";

/* eslint-disable-next-line */
export interface CreateCampaignFormProps {}

export function CreateCampaignForm(props: CreateCampaignFormProps) {
  return (
    <div className={styles["container"]}>
      <Formik
        initialValues={{ title: "", description: "", targetAmount: 0 }}
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
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
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
              <FormHelperText>The description of the campaign</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Goal to reach</FormLabel>
              <Input
                type="number"
                name="targetAmount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.targetAmount}
              />
              {errors.targetAmount &&
                touched.targetAmount &&
                errors.targetAmount}
              <FormHelperText>The target amount of the campaign</FormHelperText>
            </FormControl>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateCampaignForm;
