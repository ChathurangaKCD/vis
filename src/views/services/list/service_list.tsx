import { Box, Button } from "@chakra-ui/core";
import React from "react";
import { useStoreState } from "../../../store/hooks";
import { ServiceID } from "../../../types/service";

interface ServiceListProps {
  onClickAdd: () => {};
  onClickEdit: () => {};
}

export function ServiceList({ onClickAdd, onClickEdit }: ServiceListProps) {
  const serviceIds = useStoreState(state => state.services.allIds);
  return (
    <div>
      list<Button onClick={onClickAdd}>+</Button>
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
  const service = useStoreState(state => state.services.byId[serviceId]);
  return (
    <Box>
      {service.id}-{service.type}
    </Box>
  );
}
