import { styled } from "styled-components";

export const Button = styled.button`
  /* Button styles */
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  /* Accessibility styles */
  &:focus {
    outline: none;
    box-shadow: 0 0 3px 3px rgba(66, 153, 225, 0.6);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  transition: all 0.5s linear;
`;

export const LeftContainer = styled.div<{ leftWidth: number }>`
  flex: ${({ leftWidth }) => leftWidth};
  background-color: #f2f2f2;
  overflow: auto;
  padding: 1rem;
  background: ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
`;

export const RightContainer = styled.div<{ rightWidth: number }>`
  flex: ${({ rightWidth }) => rightWidth};
  background-color: #eaeaea;
  overflow: auto;
  padding: 1rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
`;
