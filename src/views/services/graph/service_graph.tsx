import React, { useState, useMemo } from "react";
import {
  Box,
  RadioButtonGroup,
  Button,
  Stack,
  Flex,
  useDisclosure
} from "@chakra-ui/core";
import ForceDirectedGraph from "../../../common/force_directed_graph";
// import data from "../../../common/force_directed_graph/data.json";
import { useStoreState } from "../../../store/hooks";
import { useWindowSize } from "../../../common/utils/window_size";

export function ServiceGraph() {
  const { byId, allIds } = useStoreState(state => state.services);
  const data = useMemo(() => {
    const nodes = allIds.map(svcId => {
      return { label: `${svcId}`, id: svcId };
    });
    const links = allIds.flatMap(svcId => {
      return byId[svcId].dependsOn.map(depId => {
        return { source: svcId, target: depId, value: 1 };
      });
    });
    return { nodes, links };
  }, [byId, allIds]);
  const { width, height } = useWindowSize();
  const graphWidth = Math.max(width * 0.8, 1200);
  const graphHeight = Math.max(height * 0.8, 600);
  return (
    <Box h="100%" w="100" overflow="auto">
      <ForceDirectedGraph
        height={graphHeight}
        width={graphWidth}
        data={data}
        animation
      ></ForceDirectedGraph>
    </Box>
  );
}
