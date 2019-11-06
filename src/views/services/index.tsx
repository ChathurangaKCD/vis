import { Flex, RadioButtonGroup, Stack, useDisclosure } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { DrawerWrapper } from "../../common/drawer";
import { RadioButton } from "../../common/radio_button";
import { ServiceEditor } from "./editor/service_editor";
import { ServiceGraph } from "./graph/service_graph";
import { ServiceList } from "./list/service_list";
import { useStoreActions } from "../../store/hooks";
import { ServiceID } from "../../types/service";
import { FormUIStateProvider, useFormUiContext } from "./state_provider";

type ViewType = "list" | "graph";

export function ServicesView() {
  return (
    <FormUIStateProvider>
      <ServicesViewC />
    </FormUIStateProvider>
  );
}

function ServicesViewC() {
  const reloadServices = useStoreActions(
    actions => actions.services.reloadServices
  );
  useEffect(() => {
    reloadServices();
  }, [reloadServices]);
  const [viewType, setViewType] = useState<ViewType>("list");
  const ViewContent = viewType === "list" ? ServiceList : ServiceGraph;
  const { isOpen, onClickDiscard } = useFormUiContext();
  return (
    <>
      <Stack h="100%" w="100%">
        <Flex flexBasis="auto" justify="center">
          <ViewTypeSelect onTypeSelect={setViewType}></ViewTypeSelect>
        </Flex>
        <ViewContent />
      </Stack>
      <DrawerWrapper title="Update" isOpen={isOpen} onClose={onClickDiscard}>
        {isOpen && <ServiceEditor />}
      </DrawerWrapper>
    </>
  );
}

function ViewTypeSelect({ onTypeSelect }: any) {
  return (
    <RadioButtonGroup defaultValue="list" onChange={onTypeSelect} isInline>
      <RadioButton value="list">List</RadioButton>
      <RadioButton value="graph">Graph</RadioButton>
    </RadioButtonGroup>
  );
}
