import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel
} from "@chakra-ui/core";
import { Field } from "formik";
import React from "react";

export function CheckBoxInput(props: CheckBoxInputProps) {
  const { name, label, items, validate } = props;
  return (
    <Field name={name} validate={validate}>
      {({
        field: { value },
        form: { touched, errors, setFieldValue },
        meta
      }: any) => {
        const isInvalid = false;
        const onChange = (val: any) => {
          setFieldValue(name, val);
        };
        return (
          <FormControl as="fieldset" isInvalid={isInvalid}>
            <FormLabel as="legend">{label}</FormLabel>
            <CheckboxGroup value={value} onChange={onChange}>
              {items.map((item, i) => (
                <Checkbox key={item.value} value={item.value}>
                  {item.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
            <FormErrorMessage>{errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}
