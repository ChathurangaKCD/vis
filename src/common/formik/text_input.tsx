import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  FormHelperText
} from "@chakra-ui/core";
import { Field, useField } from "formik";
import React from "react";

interface FormikInput {
  name: string;
  label: string;
  pattern?: string;
  helpText?: string;
  disabled?: boolean;
  isRequired?: boolean;
  validate?: (value: any) => string | undefined;
}

export function TextInput(props: FormikInput) {
  const {
    name,
    label,
    isRequired,
    disabled = false,
    validate,
    pattern,
    helpText
  } = props;
  const [field, meta] = useField({ name, validate });
  const { value, onChange } = field;
  const { error, touched } = meta;
  const isInvalid = error ? touched : false;
  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        pattern={pattern}
        {...{ disabled: disabled as any }}
        value={value as any}
        onChange={onChange}
        id={name}
        placeholder={name}
      />
      <FormHelperText>{helpText}</FormHelperText>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
