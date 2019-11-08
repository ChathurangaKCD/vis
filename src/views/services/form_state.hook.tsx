import { useState, useCallback, useRef } from "react";

type EntityID = number | string | null;
type EditEvent = {
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
  const openEditor = useCallback((id: EntityID) => {
    if (event !== null) {
      return window.alert("In Edit State");
    }
    setEvent({ id: id, key: Date.now(), isNew: id === null });
    editedRef.current = false;
  }, []);
  const closeEditor = useCallback((submitSuccess: boolean = false) => {
    if (!submitSuccess || editedRef.current) {
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
  return { isOpen, event, openEditor, closeEditor, setEdited };
}
