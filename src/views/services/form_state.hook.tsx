import { useState, useCallback, useRef } from "react";

type EntityID = number | string | null;
export type EditEvent = {
  /** Access existing data from a normalized store */
  id: EntityID;
  /** key provided to form renderer:
   * * destroy on new event
   * * form init actions on mount
   */
  key: number;
  /** create/edit */
  isNew: boolean;
};

export function useFormState() {
  const [event, setEvent] = useState<EditEvent | null>(null);
  const editedRef = useRef<boolean>(false);
  const openEditor = useCallback(
    (id: EntityID = null) => {
      if (event !== null) {
        return window.alert("In Edit State");
      }
      validateEntityId(id);
      setEvent({ id: id, key: Date.now(), isNew: id === null });
      editedRef.current = false;
    },
    [event]
  );
  const closeEditor = useCallback((submitSuccess: boolean = false) => {
    // check submitSuccess !== true to avoid event objects
    if (submitSuccess !== true && editedRef.current) {
      if (!window.confirm("Discard changes?")) {
        return;
      }
    }
    setEvent(null);
    editedRef.current = false;
  }, []);
  const setEdited = useCallback((edited: boolean) => {
    editedRef.current = edited;
  }, []);
  const isOpen = !!event;
  const key = event ? event.key : 0;
  return { isOpen, key, event, openEditor, closeEditor, setEdited };
}

function validateEntityId(id: EntityID) {
  if (id === null) return;
  if (["number", "string"].includes(typeof id)) return;
  throw Error("Invalid entity id");
}
