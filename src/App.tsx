import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./globalStyles";
import {
  keyboardKeys,
  useKeybindings,
} from "@harshsinghatz/react-key-bindings";
import {
  Button,
  ChatContainer,
  ChatInput,
  Container,
  RightContainer,
  SubmitContainer,
} from "./styles";
import Modal from "./components/Modal";
import APIInforForm from "./components/APIInfoForm";
import { getLocalStorageItem } from "./utils/localstorage";
import { LOCAL_CONVERSATIONS_KEY, getConversations } from "./utils/openai";
import { ChatCompletionRequestMessage } from "openai";
import Settings from "./components/Settings";

function App() {
  const [theme, setTheme] = useState("light");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<
    Partial<ChatCompletionRequestMessage>[]
  >([]);

  const getIsLightMode = () => {
    return theme === "light";
  };

  const onMessageSubmit = async () => {
    if (!message) return;
    setMessage("");
    const val = await getConversations({
      value: message,
    });

    if (val) {
      setConversations(val);
    }
  };

  useEffect(() => {
    const storedConversations = getLocalStorageItem<
      ChatCompletionRequestMessage[]
    >(LOCAL_CONVERSATIONS_KEY);

    if (storedConversations) {
      setConversations(storedConversations);
    }
  }, []);

  useKeybindings([
    {
      cmd: [keyboardKeys.Escape],
      callback: () => setModalOpen(false),
    },
  ]);

  const changeTheme = () => {
    setTheme(getIsLightMode() ? "dark" : "light");
  };

  const openDetailsModal = () => {
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={getIsLightMode() ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <APIInforForm closeModal={() => setModalOpen(false)} />
        </Modal>
        <Settings
          changeTheme={changeTheme}
          openDetailsModal={openDetailsModal}
          isLightMode={getIsLightMode()}
        />
        <RightContainer>
          {conversations?.map?.((conversation) => {
            return (
              <ChatContainer>
                {conversation?.role === "assistant" ? (
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
                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                    />
                  </svg>
                ) : (
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                )}{" "}
                {conversation?.content}
              </ChatContainer>
            );
          })}
          <SubmitContainer>
            <ChatInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              style={{
                margin: "0 0.5rem",
              }}
              onClick={() => {
                void (async () => {
                  await onMessageSubmit().catch((err) => {
                    console.log(err);
                  });
                })();
              }}
            >
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
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </Button>
          </SubmitContainer>
        </RightContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
