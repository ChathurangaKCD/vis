import { Box, Button, ButtonGroup, CloseButton, Flex } from "@chakra-ui/core";
import React from "react";
import { Service, ServiceType, ServiceID } from "../../../types/service";
import { getNodeColor } from "./fns";
import { useStoreState } from "../../../store/hooks";

interface SelectedServiceInfoViewProps {
  serviceId: ServiceID;
  onClickEdit: (serviceId: Service) => any;
  onClickDelete: (serviceId: Service) => any;
  onClickClose: () => any;
}

export function ServiceInfoView(props: SelectedServiceInfoViewProps) {
  const { serviceId, onClickEdit, onClickDelete, onClickClose } = props;
  const { id, type } = useStoreState(state => state.services.byId[serviceId]);
  const colorVariant = getNodeColor(type);
  const bg = `${colorVariant}.400`;
  return (
    <Flex justify="space-between" bg={bg} color="white">
      <Box m={2}> Service ID: {id} </Box>
      <Box m={2}> Type: {type} </Box>
      <ButtonGroup m={2} size="sm" spacing={4}>
        <Button leftIcon="email" variantColor={colorVariant} variant="solid">
          Edit
        </Button>
        <Button leftIcon="delete" variantColor={colorVariant} variant="solid">
          Delete
        </Button>
      </ButtonGroup>
      <Box m={2}>
        <CloseButton onClick={onClickClose} />
      </Box>
    </Flex>
  );
}
