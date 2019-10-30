import React, { useState } from "react";
import {
  Box,
  RadioButtonGroup,
  Button,
  Stack,
  Flex,
  useDisclosure
} from "@chakra-ui/core";

export const RadioButton = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, children, ...rest } = props as any;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "blue" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    >
      {children}
    </Button>
  );
});
