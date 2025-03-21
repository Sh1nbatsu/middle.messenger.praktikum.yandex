import Chats from "./chatsModel";

const ChatsApi = new Chats();

export const CreateChat = async (data) => {
  console.log(data);
  try {
    const response = await ChatsApi.createChat(data);

    if (response.status !== 200) {
      console.log(response.responseText);
    }

    console.log(response.responseText);
    GetChats();
  } catch (error) {
    console.log(error);
  }
};

export const GetChats = async (data?) => {
  console.log(data);

  try {
    const response = await ChatsApi.getChats(data);

    if (response.status == 200) {
      console.log(response.responseText);
      window.store.setState({ chats: JSON.parse(response.responseText) });
    } else {
      console.log();
    }
  } catch (error) {
    console.log(error);
  }
};
