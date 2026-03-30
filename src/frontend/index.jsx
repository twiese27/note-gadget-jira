import React from "react";
import ForgeReconciler, {
  Text,
  useProductContext,
  TextArea,
  Form,
  Button,
  FormSection,
  FormFooter,
  Label,
  RequiredAsterisk,
  useForm,
} from "@forge/react";
import { view } from "@forge/bridge";

const FIELD_NAME = "note";

export const Edit = () => {
  const { handleSubmit, register, getFieldId } = useForm();

  const configureGadget = (data) => {
    view.submit(data);
  };

  return (
      <Form onSubmit={handleSubmit(configureGadget)}>
        <FormSection>
          <Label labelFor={getFieldId(FIELD_NAME)}>
            Notiz
            <RequiredAsterisk />
          </Label>
          <TextArea {...register(FIELD_NAME, { required: true })} />
        </FormSection>
        <FormFooter>
          <Button appearance="primary" type="submit">
            Speichern
          </Button>
        </FormFooter>
      </Form>
  );
};

const View = () => {
  const context = useProductContext();

  if (!context) {
    return "Loading...";
  }

  const {
    extension: { gadgetConfiguration },
  } = context;

  const noteText = gadgetConfiguration?.[FIELD_NAME] ?? "";

  return (
      <>
        {noteText.split("\n").map((line, index) => (
            <Text key={index}>{line}</Text>
        ))}
      </>
  );
};

const App = () => {
  const context = useProductContext();
  if (!context) {
    return "Loading...";
  }

  return context.extension.entryPoint === "edit" ? <Edit /> : <View />;
};

ForgeReconciler.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
