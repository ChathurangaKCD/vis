import { Box, Button, RadioButtonGroup, Stack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { DrawerWrapper } from "../../common/drawer";
import { RadioButton } from "../../common/radio_button";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { ServiceEditor } from "./editor/service_editor";
import { ServiceGraph } from "./graph/service_graph";
import { ServiceList } from "./list/service_list";
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
  const isLoading = useStoreState(
    state => state.services.dataState === "FETCHING"
  );
  return (
    <>
      <Stack h="100%" w="100%">
        <Stack isInline w="50%" justifyContent="center" spacing={10}>
          <Box>
            <ViewTypeSelect onTypeSelect={setViewType}></ViewTypeSelect>
          </Box>
          <Box>
            <Button
              isLoading={isLoading}
              onClick={() => reloadServices()}
              size="sm"
            >
              Refresh All
            </Button>
          </Box>
        </Stack>
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
