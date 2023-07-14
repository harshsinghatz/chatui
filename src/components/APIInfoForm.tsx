import styled from "styled-components";
import { Button } from "../styles";
import { useEffect, useState } from "react";
import {
  getLocalStorageItem,
  updateLocalStorageItem,
} from "../utils/localstorage";
import {
  LOCAL_KEY_NAME,
  LOCAL_MODEL_NAME,
  getConversations,
} from "../utils/openai";

// Define the styled components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
  text-align: right;
`;

const TextInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
`;

const OptionSelector = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
`;

// Component
const APIInforForm = ({ closeModal }) => {
  const [apiData, setAPIData] = useState({
    key: "",
    model: "",
  });

  useEffect(() => {
    setAPIData({
      key: getLocalStorageItem(LOCAL_KEY_NAME) || "",
      model: getLocalStorageItem(LOCAL_MODEL_NAME) || "",
    });
  }, []);

  const handleFormSubmit = (e: SubmitEvent) => {
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
