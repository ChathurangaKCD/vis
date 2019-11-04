import { Collapse, Flex, Spinner } from "@chakra-ui/core";
import React, { Suspense, useCallback, useState } from "react";
import { ServiceID } from "../../../types/service";
import { useGetGraphData, useGetGraphSize } from "./fns";
import { ServiceInfoView } from "./service_info_view";

const ForceDirectedGraph = React.lazy(() =>
  import("../../../common/force_directed_graph")
);

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
    <Suspense
      fallback={
        <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      }
    >
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
    </Suspense>
  );
}
