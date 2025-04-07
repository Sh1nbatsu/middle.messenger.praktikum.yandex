import Chats from "./chatsModel";

const ChatsApi = new Chats();

export const CreateChat = async (data: { title: FormDataEntryValue }) => {
  console.log(data);
  try {
    const response = await ChatsApi.createChat(data);

    if (response.status !== 200) {
      console.log(response.responseText);
    } else if (response.status == 200) {
      console.log(response.responseText);
      GetChats();
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetChats = async (data?: Record<string, string>) => {
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

export const DeleteChat = async () => {
  const currentChat = window.store.getState().currentChat;
  if (!currentChat) {
    throw new Error("Current chat is not set.");
  }
  const chatId = currentChat.id;
  if (chatId === null) {
    throw new Error("Chat id is null.");
  }

  console.log(chatId);

  try {
    const response = await ChatsApi.deleteChat(chatId);

    if (response.status == 200) {
      console.log("Success", response.responseText);
      // window.store.setState({ currentChat: null });
      GetChats();
    } else {
      console.log("error", response.responseText);
    }
  } catch (error) {
    console.log(error);
  }
};

export const AddUser = async (data: Record<string, number>) => {
  const userId = data.user;

  const currentChat = window.store.getState().currentChat;
  if (!currentChat) {
    throw new Error("Current chat is not set.");
  }
  const chatId = currentChat.id;
  if (chatId === null) {
    throw new Error("Chat id is null.");
  }

  try {
    console.log({ users: [userId], chatId: chatId });

    const response = await ChatsApi.addUser({
      users: [userId],
      chatId: chatId,
    });

    if (response.status == 200) {
      console.log("Success", response.responseText);
    } else {
      console.log("error", response.responseText);
    }
  } catch (error) {
    console.log(error);
  }
};

export const RemoveUser = async (data: Record<string, number>) => {
  const userId = data.user;

  const currentChat = window.store.getState().currentChat;
  if (!currentChat) {
    throw new Error("Current chat is not set.");
  }
  const chatId = currentChat.id;
  if (chatId === null) {
    throw new Error("Chat id is null.");
  }

  try {
    console.log({ users: [userId], chatId: chatId });

    const response = await ChatsApi.removeUser({
      users: [userId],
      chatId: chatId,
    });

    if (response.status == 200) {
      console.log("Success", response.responseText);
    } else {
      console.log("error", response.responseText);
    }
  } catch (error) {
    console.log(error);
  }
};

export const SearchUser = async (data: { login: FormDataEntryValue }) => {
  const login = data.login;

  const currentChat = window.store.getState().currentChat;
  if (!currentChat) {
    throw new Error("Current chat is not set.");
  }
  const chatId = currentChat.id;
  if (chatId === null) {
    throw new Error("Chat id is null.");
  }

  try {
    console.log(login);

    const response = await ChatsApi.searchUser({ login });

    if (response.status == 200) {
      console.log("Success", response.responseText);
      window.store.setState({
        searchResult: JSON.parse(response.responseText),
      });
    } else {
      console.log("error", response.responseText);
    }
  } catch (error) {
    console.log(error);
  }
};

export const SearchChatUsers = async (data: Record<string, number>) => {
  const chatId = data.id;

  console.log(chatId);

  try {
    const response = await ChatsApi.getChatUsers({ id: chatId });

    console.log(response.responseText);
    if (response.status == 200) {
      console.log("success", response.responseText);

      const currentState = window.store.getState();

      window.store.setState({
        currentChat: {
          ...currentState.currentChat,
          chatUsers: JSON.parse(response.responseText),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UpdateChatAvatar = async (data: Record<string, Blob>) => {
  console.log(data);

  const currentChat = window.store.getState().currentChat;
  if (!currentChat) {
    throw new Error("Current chat is not set.");
  }
  const chatId = currentChat.id;
  if (chatId === null) {
    throw new Error("Chat id is null.");
  }

  const formData = new FormData();
  formData.append("avatar", data.avatar);
  formData.append("chatId", String(chatId));

  try {
    const response = await ChatsApi.updateChatAvatar(formData);

    console.log(response.responseText);
  } catch (error) {
    console.log(error);
  }
};

export const GetChatToken = async () => {
  const currentChat = window.store.getState().currentChat;
  if (!currentChat) {
    throw new Error("Current chat is not set.");
  }
  const chatId = currentChat.id;
  if (chatId === null) {
    throw new Error("Chat id is null.");
  }

  try {
    const response = await ChatsApi.getChatToken({ chatId: chatId });

    console.log(response);

    if (response.status == 200) {
      const currentState = window.store.getState();

      window.store.setState({
        currentChat: {
          ...currentState.currentChat,
          chatToken: JSON.parse(response.responseText),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
