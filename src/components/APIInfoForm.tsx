import styled from "styled-components";
import { Button } from "../styles";
import { useState } from "react";
import { getLocalStorageItem } from "../utils/localstorage";
import { LOCAL_KEY_NAME, LOCAL_MODEL_NAME } from "../utils/openai";

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
const APIInforForm = () => {
  const [apiData, setAPIData] = useState({
    key: getLocalStorageItem(LOCAL_KEY_NAME),
    model: getLocalStorageItem(LOCAL_MODEL_NAME),
  });

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
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
        <OptionSelector>
          <option value="">Select the model</option>
          <option value="option1">GPT-4</option>
          <option value="option2">GPT-3.5</option>
        </OptionSelector>
      </FieldContainer>
      <Button type="submit">Set Data</Button>
    </FormContainer>
  );
};

export default APIInforForm;
