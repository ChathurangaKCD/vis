import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Button
} from "@chakra-ui/core";
import React from "react";

export function ServiceEditor() {
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="service-id">Service ID</FormLabel>
        <Input type="number" id="service-id" />
      </FormControl>
      <FormControl as="fieldset" isRequired>
        <FormLabel as="legend">Service Type</FormLabel>
        <RadioGroup defaultValue="Itachi">
          <Radio value="HTTP">HTTP</Radio>
          <Radio value="gRPC">gRPC</Radio>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel as="legend">Depends on</FormLabel>
        <CheckboxGroup
          variantColor="green"
          defaultValue={["naruto", "kakashi"]}
        >
          <Checkbox value="1">Service 1</Checkbox>
          <Checkbox value="2">Service 2</Checkbox>
          <Checkbox value="3">Service 3</Checkbox>
        </CheckboxGroup>
      </FormControl>
      <Stack isInline>
        <Button variant="outline" mr={3} onClick={() => {}}>
          Cancel
        </Button>
        <Button variantColor="blue">Submit</Button>
      </Stack>
    </Stack>
  );
}
