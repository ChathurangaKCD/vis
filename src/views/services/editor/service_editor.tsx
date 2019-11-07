import { DrawerBody, DrawerHeader } from "@chakra-ui/core";
import React, { useCallback, useMemo } from "react";
import { Service, ServiceID } from "../../../types/service";
import { useStoreState, useStoreActions } from "../../../store/hooks";
import { useFormUiContext } from "../state_provider";
import { useUpsertService } from "../../../store/services.hooks";
import { ServiceForm } from "./service_form";

export const SERVICE_TYPES = [
  { value: "HTTP", label: "HTTP" },
  { value: "gRPC", label: "gRPC" }
];

const emptyServiceObj = { id: "", type: "", dependsOn: [] };

export function ServiceEditor() {
  const {
    isNew,
    selectedId,
    updatedTime,
    setEdited,
    onClickDiscard,
    onSubmitSuccess
  } = useFormUiContext();
  const service = useStoreState(state => state.services.byId[selectedId]);
  const serviceIds = useStoreState(state => state.services.allIds);
  const upsertService = useUpsertService();
  const editData = isNew ? emptyServiceObj : service;
  /**
   * Filter active service id,
   * convert to string {label, value}
   */
  const [initFormData, possibleDeps] = useMemo(() => {
    let ids = serviceIds;
    let currentDeps: string[] = [];
    if (editData && editData.id) {
      ids = ids.filter(id => id !== editData.id);
      currentDeps = (editData.dependsOn as ServiceID[]).map(v => `${v}`);
    }
    const deps = ids.map(id => ({ value: `${id}`, label: `Service ${id}` }));
    return [{ ...editData, dependsOn: currentDeps }, deps];
  }, [editData, serviceIds]);
  if (!editData) return null;
  const onSubmit = async (values: Service) => {
    const res = await upsertService(isNew, values);
    if (res) onSubmitSuccess();
    return res;
  };
  return (
    <>
      <DrawerHeader>{isNew ? "Add Service" : "Update Service"}</DrawerHeader>
      <DrawerBody>
        <ServiceForm
          key={updatedTime}
          isNew={isNew}
          data={initFormData}
          onSubmit={onSubmit}
          onDiscard={onClickDiscard}
          serviceList={possibleDeps}
          setEdited={setEdited}
        ></ServiceForm>
      </DrawerBody>
    </>
  );
}
