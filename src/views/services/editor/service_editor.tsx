import { DrawerBody, DrawerHeader } from "@chakra-ui/core";
import React, { useMemo } from "react";
import { useStoreState } from "../../../store/hooks";
import { useUpsertService } from "../../../store/services.hooks";
import { Service, ServiceID } from "../../../types/service";
import { useFormUiContext } from "../state_provider";
import { EditEvent } from "../form_state.hook";
import { ServiceForm } from "./service_form";

export const SERVICE_TYPES = [
  { value: "HTTP", label: "HTTP" },
  { value: "gRPC", label: "gRPC" }
];

const emptyServiceObj = { id: "", type: "", dependsOn: [] };

export function ServiceEditor() {
  const { event: _event, closeEditor, setEdited } = useFormUiContext();
  const event = _event as EditEvent;
  const serviceId = (event.isNew ? "NONE_EXISTING_ID" : event.id) as ServiceID;
  const service = useStoreState(state => state.services.byId[serviceId]);
  const serviceIds = useStoreState(state => state.services.allIds);
  const upsertService = useUpsertService();
  /**
   * Filter active service id,
   * convert to string {label, value}
   */
  const [initFormData, possibleDeps] = useMemo(() => {
    const editData = event.isNew ? emptyServiceObj : service;
    if (!editData) return [null, []];
    let ids = serviceIds;
    let currentDeps: string[] = [];
    if (!event.isNew) {
      ids = ids.filter(id => id !== serviceId);
      currentDeps = (editData.dependsOn as ServiceID[]).map(v => `${v}`);
    }
    const deps = ids.map(id => ({ value: `${id}`, label: `Service ${id}` }));
    return [{ ...editData, dependsOn: currentDeps }, deps];
    // eslint-disable-next-line
  }, []);
  if (!initFormData) return null;
  const onSubmit = async (values: Service) => {
    const res = await upsertService(event.isNew, values);
    if (res) closeEditor(true);
    return res;
  };
  return (
    <>
      <DrawerHeader>
        {event.isNew ? "Add Service" : "Update Service"}
      </DrawerHeader>
      <DrawerBody height="100%" overflowY="auto">
        <ServiceForm
          isNew={event.isNew}
          data={initFormData}
          onSubmit={onSubmit}
          onDiscard={closeEditor}
          serviceList={possibleDeps}
          setEdited={setEdited}
        ></ServiceForm>
      </DrawerBody>
    </>
  );
}
