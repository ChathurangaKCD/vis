import { Button, Stack, Box, DrawerBody, DrawerHeader } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useCallback, useMemo } from "react";
import { CheckBoxInput, RadioInput, TextInput } from "../../../common/formik";
import { Service, ServiceID } from "../../../types/service";
import { useStoreState, useStoreActions } from "../../../store/hooks";
import { useFormUiContext } from "../state_provider";

const SERVICE_TYPES = [
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
    onSubmitSuccess
  } = useFormUiContext();
  const service = useStoreState(state => state.services.byId[selectedId]);
  const serviceIds = useStoreState(state => state.services.allIds);
  const { createService, updateService } = useStoreActions(
    actions => actions.services
  );
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
    // alert(JSON.stringify(values, null, 2))
    const fn = isNew ? createService : updateService;
    const res = await fn(values);
    alert(res);
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
          serviceList={possibleDeps}
          setEdited={setEdited}
        ></ServiceForm>
      </DrawerBody>
    </>
  );
}

interface ServiceFormProps {
  isNew: boolean;
  data: any;
  serviceList: { label: string; value: string }[];
  onSubmit: (formData: Service) => Promise<boolean>;
  setEdited: (edited: boolean) => void;
}

function ServiceForm({
  data,
  isNew,
  serviceList,
  onSubmit,
  setEdited
}: ServiceFormProps) {
  return (
    <Formik
      initialValues={data}
      onSubmit={async (values, actions) => {
        const dependsOn = values.dependsOn.map((v: any) => parseInt(v, 10));
        const { id, type } = values;
        const success = await onSubmit({
          type,
          id: parseInt(id, 10),
          dependsOn
        });
        // form closed
        if (success) return;
        // else stay in view
        actions.setSubmitting(false);
      }}
    >
      {props => {
        setEdited(props.dirty);
        return (
          <Form>
            <Stack spacing={4}>
              <Box>
                <TextInput
                  name="id"
                  label="Service ID"
                  disabled={!isNew}
                  isRequired
                  pattern="\d*"
                  helpText={isNew ? "Service Id should be a number" : undefined}
                ></TextInput>
              </Box>
              <Box>
                <RadioInput
                  name="type"
                  isRequired
                  validate={s => (s ? undefined : "Service type needed.")}
                  label="Service Type"
                  items={SERVICE_TYPES}
                ></RadioInput>
              </Box>
              <Box>
                <CheckBoxInput
                  name="dependsOn"
                  label="Depends On"
                  items={serviceList}
                ></CheckBoxInput>
              </Box>
              <Stack isInline>
                <Button
                  isLoading={props.isSubmitting}
                  variant="outline"
                  mr={3}
                  onClick={() => {}}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  variantColor="teal"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}
