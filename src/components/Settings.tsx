import { useState } from "react";
import { Button as NormalButton } from "../styles";
import styled from "styled-components";

// Define the button styles
const Button = styled.button`
  position: fixed;
  bottom: 7rem;
  left: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.buttonColor as string};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) => theme.accentColor as string};
  }
`;

// Define the icon styles
const Icon = styled.span`
  color: ${({ theme }) => theme.textColor as string};
  font-size: 20px;
  padding: 5px;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

// Define the options container styles
const OptionsContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 12rem;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  display: ${(props) => (props.visible ? "flex" : "none")};
  transform: translateY(${(props) => (props.visible ? "0" : "10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 1000;
`;

// Define the option styles
const Option = styled.button`
  /* width: 120px; */
  height: 40px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Settings = ({
  changeTheme,
  isLightMode,
  openDetailsModal,
}: {
  changeTheme: () => void;
  isLightMode: boolean;
  openDetailsModal: () => void;
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <>
      <Button onClick={toggleOptions}>
        <Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </Icon>
      </Button>
      <OptionsContainer visible={optionsVisible}>
        <Option>
          <NormalButton onClick={changeTheme}>
            {isLightMode ? "Dark" : "Light"} Mode
          </NormalButton>
        </Option>
        <Option>
          <NormalButton onClick={openDetailsModal}>Set API Data</NormalButton>
        </Option>
      </OptionsContainer>
    </>
  );
};

export default Settings;
