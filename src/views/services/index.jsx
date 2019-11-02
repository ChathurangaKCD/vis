import React, { useState, useEffect } from "react";
import {
  Box,
  RadioButtonGroup,
  Button,
  Stack,
  Flex,
  useDisclosure
} from "@chakra-ui/core";
import { DrawerWrapper } from "../../common/drawer";
import { ServiceEditor } from "./editor/service_editor";
import { ServiceList } from "./list/service_list";
import { ServiceGraph } from "./graph/service_graph";
import { RadioButton } from "../../common/radio_button";
import { useStoreActions } from "easy-peasy";

export function ServicesView() {
  const reloadServices = useStoreActions(
    actions => actions.services.reloadServices
  );
  useEffect(() => {
    reloadServices();
  }, [reloadServices]);
  const [viewType, setViewType] = useState("list");
  const ViewContent = viewType === "list" ? ServiceList : ServiceGraph;
  const {
    isOpen: isEditorOpen,
    onOpen: openEditor,
    onClose: closeEditor
  } = useDisclosure(true);
  return (
    <>
      <Stack>
        <Flex justify="center">
          <ViewTypeSelect onTypeSelect={setViewType}></ViewTypeSelect>
        </Flex>
        <Box>
          <ViewContent onClickAdd={openEditor} />
        </Box>
      </Stack>
      <DrawerWrapper title="Update" isOpen={isEditorOpen} onClose={closeEditor}>
        <ServiceEditor></ServiceEditor>
      </DrawerWrapper>
    </>
  );
}

function ViewTypeSelect({ onTypeSelect }) {
  return (
    <RadioButtonGroup defaultValue="list" onChange={onTypeSelect} isInline>
      <RadioButton value="list">List</RadioButton>
      <RadioButton value="graph">Graph</RadioButton>
    </RadioButtonGroup>
  );
}
