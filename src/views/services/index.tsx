import { Flex, RadioButtonGroup, Stack, useDisclosure } from "@chakra-ui/core";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { DrawerWrapper } from "../../common/drawer";
import { RadioButton } from "../../common/radio_button";
import { ServiceEditor } from "./editor/service_editor";
import { ServiceGraph } from "./graph/service_graph";
import { ServiceList } from "./list/service_list";

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
      <Stack h="100%" w="100%">
        <Flex flexBasis="auto" justify="center">
          <ViewTypeSelect onTypeSelect={setViewType}></ViewTypeSelect>
        </Flex>
        <ViewContent onClickAdd={openEditor} />
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
