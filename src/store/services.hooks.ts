import { useStoreActions, useStoreState } from "./hooks";
import { useCallback, useState } from "react";
import { ServiceID } from "../types/service";
import { useToast } from "@chakra-ui/core";

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
          title: `Delete Success`,
          description: "Service ${serviceId} deleted",
          status: "success",
          duration: 2000,
          isClosable: true
        });
      } else {
        setRunning(false);
      }
    }
  }, []);
  return [isRunning, cb];
}
