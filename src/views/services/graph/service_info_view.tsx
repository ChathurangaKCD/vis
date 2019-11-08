import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Flex,
  Text
} from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useStoreState } from "../../../store/hooks";
import { useDeleteServiceAction } from "../../../store/services.hooks";
import { ServiceID } from "../../../types/service";
import { useFormUiContext } from "../state_provider";
import { getNodeColor } from "./fns";

interface SelectedServiceInfoViewProps {
  serviceId: ServiceID;
  onClickClose: () => any;
}

export function ServiceInfoView(props: SelectedServiceInfoViewProps) {
  const { serviceId, onClickClose } = props;
  const { id, type } =
    useStoreState(state => state.services.byId[serviceId]) || {};
  const { openEditor } = useFormUiContext();
  const [isLoading, onClickDelete] = useDeleteServiceAction(serviceId);
  const colorVariant = getNodeColor(type);
  const bg = `${colorVariant}.400`;
  useEffect(() => {
    if (isLoading) onClickClose();
  }, [isLoading, onClickClose]);
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
          onClick={() => openEditor(serviceId)}
        >
          Edit
        </Button>
        <Button
          leftIcon="delete"
          m={1}
          variantColor={colorVariant}
          variant="solid"
          onClick={onClickDelete}
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
