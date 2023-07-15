import {
  Button,
  FieldContainer,
  FormContainer,
  Label,
  OptionSelector,
  TextInput,
} from "../styles";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  updateLocalStorageItem,
} from "../utils/localstorage";
import { LOCAL_KEY_NAME, LOCAL_MODEL_NAME } from "../utils/openai";

interface APIInforFormProps {
  closeModal: () => void;
}
const APIInforForm = ({ closeModal }: APIInforFormProps) => {
  const [apiData, setAPIData] = useState({
    key: "",
    model: "",
  });

  useEffect(() => {
    setAPIData({
      key: getLocalStorageItem<string>(LOCAL_KEY_NAME) || "",
      model: getLocalStorageItem<string>(LOCAL_MODEL_NAME) || "",
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateLocalStorageItem(LOCAL_KEY_NAME, apiData.key);

    updateLocalStorageItem(LOCAL_MODEL_NAME, apiData.model);
    closeModal();
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <FieldContainer>
        <Label>API key:</Label>
        <TextInput
          type="text"
          onChange={(e) => setAPIData({ ...apiData, key: e.target.value })}
          value={apiData.key}
        />
      </FieldContainer>
      <FieldContainer>
        <Label>GPT Model:</Label>
        <OptionSelector
          onChange={(e) => setAPIData({ ...apiData, model: e.target.value })}
          value={apiData.model}
        >
          <option value="">Select the model</option>
          {/* <option value="gpt-4">GPT-4</option> */}
          <option value="gpt-3.5-turbo">GPT-3.5</option>
        </OptionSelector>
      </FieldContainer>
      <Button type="submit" disabled={!(apiData.key && apiData.model)}>
        Set Data
      </Button>
    </FormContainer>
  );
};

export default APIInforForm;
