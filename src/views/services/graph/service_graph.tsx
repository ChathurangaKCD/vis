import { Collapse, Flex } from "@chakra-ui/core";
import React, { useCallback, useState } from "react";
import ForceDirectedGraph from "../../../common/force_directed_graph";
import { ServiceID } from "../../../types/service";
import { useGetGraphData, useGetGraphSize } from "./fns";
import { ServiceInfoView } from "./service_info_view";

export function ServiceGraph() {
  const { height, width } = useGetGraphSize();
  const [selectedId, setSelectedId] = useState<ServiceID | null>(null);
  const data = useGetGraphData(selectedId);
  const onSelectService = useCallback(
    (sId: ServiceID) => setSelectedId(sId),
    []
  );
  const clearSelection = useCallback(() => setSelectedId(null), []);
  return (
    <>
      <Flex h="100%" w="100%" overflow="auto" justifyContent="center">
        <ForceDirectedGraph
          height={height}
          width={width}
          data={data}
          animation
          onClickService={onSelectService}
        ></ForceDirectedGraph>
      </Flex>
      <Collapse isOpen={!!selectedId}>
        {selectedId && (
          <ServiceInfoView
            serviceId={selectedId}
            onClickClose={clearSelection}
            onClickEdit={() => {}}
            onClickDelete={() => {}}
          />
        )}
      </Collapse>
    </>
  );
}
