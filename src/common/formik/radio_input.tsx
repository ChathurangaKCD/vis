import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup
} from "@chakra-ui/core";
import { useField } from "formik";
import React from "react";

export function RadioInput(props: RadioInputProps) {
  const { name, label, items, validate, isRequired = false } = props;
  const [field, meta] = useField({ name, validate });
  const { error, touched } = meta;
  const isInvalid = error ? touched : false;
  const { value: fieldValue, onChange } = field;
  const radioOnChange = ({ target: { value } }: any) =>
    onChange({ target: { name, value } });
  return (
    <FormControl as="fieldset" isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel as="legend">{label}</FormLabel>
      <RadioGroup value={fieldValue as any} onChange={radioOnChange}>
        {items.map(({ label, value }) => (
          <Radio value={value} key={value}>
            {label}
          </Radio>
        ))}
      </RadioGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
