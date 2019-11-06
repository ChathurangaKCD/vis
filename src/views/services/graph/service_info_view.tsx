import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  Text
} from "@chakra-ui/core";
import React from "react";
import { Service, ServiceType, ServiceID } from "../../../types/service";
import { getNodeColor } from "./fns";
import { useStoreState } from "../../../store/hooks";
import { useFormUiContext } from "../state_provider";

interface SelectedServiceInfoViewProps {
  serviceId: ServiceID;
  onClickClose: () => any;
}

export function ServiceInfoView(props: SelectedServiceInfoViewProps) {
  const { serviceId, onClickClose } = props;
  const { id, type } = useStoreState(state => state.services.byId[serviceId]);
  const { onClickEdit } = useFormUiContext();
  const colorVariant = getNodeColor(type);
  const bg = `${colorVariant}.400`;
  return (
    <Flex justify="space-between" bg={bg} color="white">
      <Box m={2}>
        <Text as="i">Service ID:</Text> {id}
      </Box>
      <Box m={2}>
        <Text as="i">Type:</Text> {type}
      </Box>
      <ButtonGroup m={1} size="sm" spacing={4}>
        <Button
          leftIcon="edit"
          m={1}
          variantColor={colorVariant}
          variant="solid"
          onClick={() => onClickEdit(serviceId)}
        >
          Edit
        </Button>
        <Button
          leftIcon="delete"
          m={1}
          variantColor={colorVariant}
          variant="solid"
        >
          Delete
        </Button>
      </ButtonGroup>
      <Box m={2}>
        <CloseButton onClick={onClickClose} />
      </Box>
    </Flex>
  );
}
