import { Box, Button, Spinner, Stack, Text } from "@chakra-ui/core";
import React from "react";
import { useStoreState } from "../../../store/hooks";
import {
  useDeleteServiceAction,
  useReloadService
} from "../../../store/services.hooks";
import { ServiceID } from "../../../types/service";
import { useFormUiContext } from "../state_provider";

export function ServiceList() {
  const { openEditor } = useFormUiContext();
  const loadingState = useStoreState(state => state.services.dataState);
  const serviceIds = useStoreState(state => state.services.allIds);
  switch (loadingState) {
    case "FETCHING":
      return <div>Loading</div>;
    case "EMPTY":
      return <div>No data available..</div>;
  }
  return (
    <>
      <Box>
        <Button onClick={() => openEditor()}>Add +</Button>
      </Box>
      <Box h="100%" overflowY="auto">
        {serviceIds.map(serviceId => (
          <ServiceCard serviceId={serviceId} key={serviceId} />
        ))}
      </Box>
    </>
  );
}

interface ServiceCardProps {
  serviceId: ServiceID;
}
function ServiceCard({ serviceId }: ServiceCardProps) {
  const { openEditor } = useFormUiContext();
  const [isLoading, onClickDelete] = useDeleteServiceAction(serviceId);
  const service = useStoreState(state => state.services.byId[serviceId]);
  const [isReloading, reload] = useReloadService(serviceId);
  if (isReloading || isLoading)
    return (
      <Box>
        <Spinner></Spinner>
      </Box>
    );
  return (
    <Stack m={4}>
      <Text>
        {service.id}-{service.type}
      </Text>
      <Text>Dependencies: {service.dependsOn.join(", ")}</Text>
      <Stack isInline spacing={4}>
        <Button size="sm" onClick={reload}>
          Reload
        </Button>
        <Button
          size="sm"
          isLoading={isLoading}
          onClick={() => openEditor(serviceId)}
        >
          Edit
        </Button>
        <Button size="sm" isLoading={isLoading} onClick={onClickDelete}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
