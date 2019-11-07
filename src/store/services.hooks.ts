import { useStoreActions, useStoreState } from "./hooks";
import { useCallback, useState } from "react";
import { ServiceID, Service } from "../types/service";
import { useToast, useToastOptions } from "@chakra-ui/core";

const successProps: Partial<useToastOptions> = {
  status: "success",
  duration: 2000,
  isClosable: true
};
const errorProps: Partial<useToastOptions> = {
  ...successProps,
  status: "error"
};
export function useDeleteServiceAction(
  serviceId: ServiceID
): [boolean, () => void] {
  const [isRunning, setRunning] = useState(false);
  const deleteFn = useStoreActions(actions => actions.services.deleteService);
  const dependants = useStoreState(
    state => state.services.dependantsById[serviceId]
  );
  const depCount = dependants ? dependants.length : 0;
  const toast = useToast();
  const cb = useCallback(() => {
    if (depCount !== 0)
      return alert(
        `Error: ${depCount} services have listed this as a dependancy `
      );
    const res = window.confirm(`Confirm delete?`);
    if (res) {
      setRunning(true);
      const res = deleteFn(serviceId);
      if (res) {
        toast({
          ...successProps,
          title: `Delete Success`,
          description: `Service ${serviceId} deleted`
        });
      } else {
        setRunning(false);
      }
    }
  }, []);
  return [isRunning, cb];
}

export function useReloadService(serviceId: ServiceID): [boolean, () => void] {
  const [isReloading, setReloading] = useState(false);
  const reloadServiceById = useStoreActions(
    actions => actions.services.reloadServiceById
  );
  const toast = useToast();
  const reload = useCallback(async () => {
    setReloading(true);
    const res = reloadServiceById(serviceId);
    if (res) {
      toast({
        ...successProps,
        title: `Reload Success`,
        description: `Refreshed service ${serviceId} data`
      });
    } else {
      alert("failed");
    }
    setReloading(false);
  }, []);
  return [isReloading, reload];
}

export function useUpsertService() {
  const toast = useToast();
  const { createService, updateService } = useStoreActions(
    actions => actions.services
  );
  const onSubmit = useCallback(async (isNew: boolean, data: Service) => {
    const fn = isNew ? createService : updateService;
    const res = await fn(data);
    if (res) {
      toast({
        ...successProps,
        title: `Success`,
        description: `${isNew ? "Created" : "Updated"} service ${data.id}`
      });
    } else {
      toast({
        ...errorProps,
        title: `Failed`,
        description: `Failed to ${isNew ? "create" : "update"} service`
      });
    }
    return res;
  }, []);
  return onSubmit;
}
