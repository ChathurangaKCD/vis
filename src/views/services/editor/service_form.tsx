import { Button, Stack, Box } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { CheckBoxInput, RadioInput, TextInput } from "../../../common/formik";
import { Service } from "../../../types/service";
import { SERVICE_TYPES } from "./service_editor";
interface ServiceFormProps {
  isNew: boolean;
  data: any;
  serviceList: {
    label: string;
    value: string;
  }[];
  onSubmit: (formData: Service) => Promise<boolean>;
  setEdited: (edited: boolean) => void;
  onDiscard: () => void;
}
export function ServiceForm({
  data,
  isNew,
  serviceList,
  onSubmit,
  onDiscard,
  setEdited
}: ServiceFormProps) {
  return (
    <Formik
      initialValues={data}
      onSubmit={async (values, actions) => {
        const dependsOn = values.dependsOn.map((v: any) => parseInt(v, 10));
        const { id, type } = values;
        const success = await onSubmit({
          type,
          id: parseInt(id, 10),
          dependsOn
        });
        // form closed
        if (success) return;
        // else stay in view
        actions.setSubmitting(false);
      }}
    >
      {props => {
        setEdited(props.dirty);
        return (
          <Form>
            <Stack spacing={4}>
              <Box>
                <TextInput
                  name="id"
                  label="Service ID"
                  disabled={!isNew}
                  isRequired
                  pattern="\d*"
                  helpText={isNew ? "Service Id should be a number" : undefined}
                ></TextInput>
              </Box>
              <Box>
                <RadioInput
                  name="type"
                  isRequired
                  validate={s => (s ? undefined : "Service type needed.")}
                  label="Service Type"
                  items={SERVICE_TYPES}
                ></RadioInput>
              </Box>
              <Box>
                <CheckBoxInput
                  name="dependsOn"
                  label="Depends On"
                  items={serviceList}
                ></CheckBoxInput>
              </Box>
              <Stack isInline>
                <Button
                  isLoading={props.isSubmitting}
                  variant="outline"
                  mr={3}
                  onClick={onDiscard}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  variantColor="teal"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
