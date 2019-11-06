import React, { useState, useRef, useCallback, useContext } from "react";
import { useDisclosure } from "@chakra-ui/core";

export function useFormState() {
  /** */
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [updatedTime, setUpdatedTime] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const editedRef = useRef<boolean>(false);
  /** */
  const onClickAdd = useCallback(() => {
    if (isOpen) return false;
    setIsNew(true);
    setSelectedId(-11);
    setUpdatedTime(Date.now());
    (onOpen as any)();
    return true;
  }, []);
  const onClickEdit = useCallback((id: number) => {
    if (isOpen) return false;
    setIsNew(false);
    setSelectedId(id);
    setUpdatedTime(Date.now());
    (onOpen as any)();
    return true;
  }, []);
  const onClickDiscard = useCallback(() => {
    const a = !editedRef.current || window.confirm("Close");
    if (!a) return;
    setIsNew(true);
    setSelectedId(-1);
    setUpdatedTime(Date.now());
    (onClose as any)();
  }, []);
  const setEdited = useCallback((edited: boolean) => {
    editedRef.current = edited;
  }, []);
  const onSubmitSuccess = useCallback(() => {
    setEdited(false);
    onClickDiscard();
  }, []);
  return {
    selectedId,
    isNew,
    updatedTime,
    isOpen,
    onClickAdd,
    onClickEdit,
    onClickDiscard,
    onSubmitSuccess,
    setEdited
  };
}

const FormUiStateContext = React.createContext<ReturnType<typeof useFormState>>(
  {} as any
);

const FormUIStateProvider_ = FormUiStateContext.Provider;

export function FormUIStateProvider({ children }: any) {
  const context = useFormState();
  return (
    <FormUiStateContext.Provider value={context}>
      {children}
    </FormUiStateContext.Provider>
  );
}
export function useFormUiContext() {
  return useContext(FormUiStateContext);
}
