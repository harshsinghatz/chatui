import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import { getLocalStorageItem, updateLocalStorageItem } from "./localstorage";

export const LOCAL_KEY_NAME = "API_KEY";
export const LOCAL_MODEL_NAME = "MODEL_NAME";
export const LOCAL_CONVERSATIONS_KEY = "conversations";

const apiKey = getLocalStorageItem(LOCAL_KEY_NAME) as string;

const modelName = getLocalStorageItem(LOCAL_MODEL_NAME) as string;

const config = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(config);

export const getConversations = async ({ value }: { value: string }) => {
  try {
    let prevValue = getLocalStorageItem(
      LOCAL_CONVERSATIONS_KEY
    ) as ChatCompletionRequestMessage[];

    updateLocalStorageItem(LOCAL_CONVERSATIONS_KEY, [
      ...(<[]>(prevValue || [])),
      {
        role: "user",
        content: value,
      },
    ]);

    const localConversations = getLocalStorageItem(LOCAL_CONVERSATIONS_KEY);

    if (!localConversations) return;

    const chatCompletion = await openai.createChatCompletion({
      model: modelName,
      messages: localConversations as ChatCompletionRequestMessage[],
    });

    const message = {
      ...chatCompletion.data.choices[0].message,
    };

    prevValue = getLocalStorageItem(
      LOCAL_CONVERSATIONS_KEY
    ) as ChatCompletionRequestMessage[];

    const newValue = Array.isArray(prevValue) ? [...prevValue, message] : [];

    const uniqueContent = new Set();

    const filteredArray = newValue.filter((element) => {
      if (uniqueContent.has(element.content)) {
        return false;
      }

      uniqueContent.add(element.content);
      return true;
    });

    console.log(prevValue);
    updateLocalStorageItem(LOCAL_CONVERSATIONS_KEY, filteredArray);

    return filteredArray;
  } catch (err) {
    console.error(err);
  }
};
