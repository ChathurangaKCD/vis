import { Button } from "@chakra-ui/core";
import React from "react";

interface RadioButtonProps {
  children: string;
  value: string;
}
export const RadioButton = React.forwardRef((props: RadioButtonProps, ref) => {
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
