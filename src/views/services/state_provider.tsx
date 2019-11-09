import React, { useContext } from "react";
import { useFormState } from "./form_state.hook";

const FormUiStateContext = React.createContext<ReturnType<typeof useFormState>>(
  {} as any
);

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
