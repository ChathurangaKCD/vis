import React, { useState } from "react";
import {
  Box,
  RadioButtonGroup,
  Button,
  Stack,
  Flex,
  useDisclosure
} from "@chakra-ui/core";

interface ServiceListProps {
  onClickAdd: () => {};
  onClickEdit: () => {};
}

export function ServiceList({ onClickAdd, onClickEdit }: ServiceListProps) {
  return (
    <div>
      list<Button onClick={onClickAdd}>+</Button>
    </div>
  );
}
