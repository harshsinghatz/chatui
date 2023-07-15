import { styled } from "styled-components";

export const Button = styled.button`
  /* Button styles */
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.buttonColor as string};
  color: ${({ theme }) => theme.textColor as string};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  /* Accessibility styles */
  &:focus {
    outline: none;
    box-shadow: 0 0 3px 3px rgba(66, 153, 225, 0.6);
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  transition: all 0.5s linear;
`;

export const RightContainer = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.secondaryColor as string};
  overflow: auto;
  padding: 1rem;
  background: ${({ theme }) => theme.body as string};
  color: ${({ theme }) => theme.text as string};
  transition: all 0.5s linear;
  position: relative;
`;

export const ChatContainer = styled.div`
  padding: 2rem 3rem;
  margin: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.primaryColor as string};

  svg {
    min-height: 2rem;
    min-width: 2rem;
    max-height: 2rem;
    max-width: 2rem;

    color: ${({ theme }) => theme.buttonColor as string};
  }
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  margin-right: 10px;
  text-align: right;

  color: ${({ theme }) => theme.textColor as string};
`;

export const TextInput = styled.input`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.accentColor as string};

  background-color: ${({ theme }) => theme.backgroundColor as string};

  color: ${({ theme }) => theme.textColor as string};
`;

export const OptionSelector = styled.select`
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.accentColor as string};

  background-color: ${({ theme }) => theme.backgroundColor as string};

  color: ${({ theme }) => theme.textColor as string};
`;

export const ChatInput = styled.input`
  padding: 1rem;
  font-size: 1.5rem;
  outline: none;
  border: 0;
  border-radius: 5px;
  flex: 1;
  min-width: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor as string};
  box-shadow: ${({ theme }) =>
    `inset 0 0 10px 2px ${theme.accentColor as string},
    0 0 10px ${theme.buttonColor as string}`};

  color: ${({ theme }) => theme.textColor as string};
`;

export const SubmitContainer = styled.div`
  position: sticky;
  bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  /* gap: 1rem; */
  background-color: ${({ theme }) => theme.backgroundColor as string};
`;
