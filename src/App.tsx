import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./globalStyles";
import {
  keyboardKeys,
  useKeybindings,
} from "@harshsinghatz/react-key-bindings";
import { Button, Container, LeftContainer, RightContainer } from "./styles";
import Modal from "./components/Modal";
import APIInforForm from "./components/APIInfoForm";
import { getLocalStorageItem } from "./utils/localstorage";

function App() {
  const [theme, setTheme] = useState("light");
  const [leftWidth, setLeftWidth] = useState(3);
  const [rightWidth, setRightWidth] = useState(7);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const newLeftWidth = e.clientX / window.innerWidth;
    const newRightWidth = 1 - newLeftWidth;

    setLeftWidth(newLeftWidth);
    setRightWidth(newRightWidth);
  };

  const getIsLightMode = () => {
    return theme === "light";
  };

  useKeybindings([
    {
      cmd: [keyboardKeys.Escape],
      callback: () => setModalOpen(false),
    },
  ]);

  const conversations = getLocalStorageItem("conversations");

  return (
    <ThemeProvider theme={getIsLightMode() ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <LeftContainer leftWidth={leftWidth}>
          <Button onClick={() => setTheme(getIsLightMode() ? "dark" : "light")}>
            {getIsLightMode() ? "Dark" : "Light"} Mode
          </Button>
          <Button onClick={() => setModalOpen(true)}>Set API Data</Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <APIInforForm closeModal={() => setModalOpen(false)} />
          </Modal>
          <div
            style={{
              width: "5px",
              background: "#333",
              cursor: "col-resize",
            }}
            draggable="true"
            onDrag={(e) => handleDrag(e)}
          />{" "}
        </LeftContainer>
        <RightContainer rightWidth={rightWidth}>
          {conversations?.role}
          {conversations?.content}
        </RightContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
