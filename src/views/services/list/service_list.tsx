import { Box, Button, Spinner } from "@chakra-ui/core";
import React from "react";
import { useStoreState, useStoreActions } from "../../../store/hooks";
import { ServiceID } from "../../../types/service";
import { useFormUiContext } from "../state_provider";
import { useDeleteServiceAction } from "../../../store/services.hooks";

export function ServiceList() {
  const { onClickAdd } = useFormUiContext();
  const state = useStoreState(state => state.services.dataState);
  const serviceIds = useStoreState(state => state.services.allIds);
  switch (state) {
    case "FETCHING":
      return <div>Loading</div>;
    case "EMPTY":
      return <div>No data available..</div>;
  }
  return (
    <div>
      <Button onClick={onClickAdd}>Add +</Button>
      {serviceIds.map(serviceId => (
        <ServiceCard serviceId={serviceId} key={serviceId} />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  serviceId: ServiceID;
}
function ServiceCard({ serviceId }: ServiceCardProps) {
  const { onClickEdit } = useFormUiContext();
  const [isLoading, onClickDelete] = useDeleteServiceAction(serviceId);
  const service = useStoreState(state => state.services.byId[serviceId]);
  if (isLoading)
    return (
      <Box>
        <Spinner></Spinner>
      </Box>
    );
  return (
    <Box>
      {service.id}-{service.type}
      <Button isLoading={isLoading} onClick={() => onClickEdit(serviceId)}>
        Edit
      </Button>
      <Button isLoading={isLoading} onClick={onClickDelete}>
        Delete
      </Button>
    </Box>
  );
}
