import { OpenAIApi, Configuration } from "openai";
import { getLocalStorageItem, updateLocalStorageItem } from "./localstorage";

export const LOCAL_KEY_NAME = "API_KEY";
export const LOCAL_MODEL_NAME = "MODEL_NAME";

const apiKey = getLocalStorageItem(LOCAL_KEY_NAME) as string;

const modelName = getLocalStorageItem(LOCAL_MODEL_NAME) as string;

const config = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(config);

export const getConversations = async () => {
  try {
    console.log(apiKey, modelName);

    const chatCompletion = await openai.createChatCompletion({
      model: modelName,
      messages: [{ role: "user", content: "Hello world" }],
    });

    console.log(chatCompletion.data.choices[0].message);

    updateLocalStorageItem(
      "conversations",
      chatCompletion.data.choices[0].message
    );
    return chatCompletion.data.choices[0].message;
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }
};
