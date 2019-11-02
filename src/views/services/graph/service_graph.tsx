import React, { useState } from "react";
import {
  Box,
  RadioButtonGroup,
  Button,
  Stack,
  Flex,
  useDisclosure
} from "@chakra-ui/core";
import ForceDirectedGraph from "../../../common/force_directed_graph";
import data from "../../../common/force_directed_graph/data.json";

export function ServiceGraph() {
  return (
    <Box>
      graph
      <ForceDirectedGraph
        height={500}
        width={1200}
        data={data}
      ></ForceDirectedGraph>
    </Box>
  );
}
